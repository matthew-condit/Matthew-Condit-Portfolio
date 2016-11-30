var app = angular.module('myApp', []),
  apiKey = 'MDExODQ2OTg4MDEzNzQ5OTM4Nzg5MzFiZA001',
  nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';
app.directive('nprLink', function () {
  return {
    restrict: 'EA',
    require: ['^ngModel'],
    replace: true,
    scope: {
      ngModel: '=',
      player: '='
    },
    template: '<div class="nprLink row" player="player" ng-click="player.play(ngModel)"><span class="name large-8 columns"><button class="large-2 small-2 playButton columns"><div class="triangle"></div></button><div class="large-10 small-10 columns"><div class="row"><span class="large-12">{{ ngModel.title.$text }}</span></div><div class="row"><div class="small-1 columns"></div><div class="small-2 columns push-8"><a href="{{ ngModel.link[0].$text }}">Link</a></div></div></div></span></div>', //    templateUrl: 'nprListItem.html',
    link: function (scope, ele, attr) {
      scope.duration = scope.ngModel.audio[0].duration.$text;
    }
  }
});
app.factory('audio', ['$document', function ($document) {
  var audio = $document[0].createElement('audio');
  return audio;
}]).factory('player', ['audio', '$rootScope', function (audio, $rootScope) {
  var player = {
    playing: false,
    current: null,
    ready: false,
    play: function (program) {
      console.log('playing');
      // If we are playing, stop the current playback
      if (player.playing) player.stop();
      var url = program.audio[0].format.mp4.$text; // from the npr API
      player.current = program; // Store the current program
      audio.src = url;
      audio.play(); // Start playback of the url
      player.playing = true
    },
    resume: function () {
      audio.play(); // Start playback of the url
      player.playing = true
    },
    stop: function () {
      if (player.playing) {
        audio.pause(); // stop playback
        // Clear the state of the player
        player.ready = player.playing = false;
        player.current = null;
      }
    },
    currentTime: function () {
      return audio.currentTime;
    },
    currentDuration: function () {
      return parseInt(audio.duration);
    }
  };
  audio.addEventListener('ended', function () {
    $rootScope.$apply(player.stop());
  });
  audio.addEventListener('timeupdate', function (evt) {
    $rootScope.$apply(function () {
      player.progress = player.currentTime();
      player.progress_percent = player.progress / player.currentDuration();
    });
  });
  audio.addEventListener('canplay', function (evt) {
    $rootScope.$apply(function () {
      player.ready = true;
    });
  });
  return player;
}]).factory('nprService', ['$http', function ($http) {
  var doRequest = function (apiKey) {
    return $http({
      method: 'JSONP',
      url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
    })
  };
  return {
    programs: function (apiKey) {
      return doRequest(apiKey);
    }
  }
}]);

app.controller('PlayerController', ['$scope', 'nprService', 'player',
  function ($scope, nprService, player) {
  $scope.player = player;
  nprService.programs(apiKey)
    .success(function (data, status) {
      $scope.programs = data.list.story;
    });

}]);



app.controller('RelatedController', ['$scope', 'player',
  function ($scope, player) {
    $scope.player = player;

    $scope.$watch('player.current', function (program) {
      if (program) {
        $scope.related = [];
        console.log(program.relatedLink);
        angular.forEach(program.relatedLink, function (link) {
          console.log(link);
          $scope.related.push({
            link: link.link[0].$text,
            caption: link.caption.$text
          })
        })
      }
    });

}]);









//line push comment
