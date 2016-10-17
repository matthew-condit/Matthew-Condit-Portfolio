$(function() {
  $("form[name='registration']").validate({
    rules: {
      name: "required", 
      username: "required", 
      email: {
        required: true,
        email: true
      }, 
      password: {
        required: true, 
        minlength: 6
      }, 
      confirmPassword: {
        required: true, 
        minelength: 6
      }
    }, 
    messages: {
      name: "Please enter your name", 
      username: "Please enter a valid username", 
      password: {
        required: "Please provide a password", 
        minlength: "Your password must be at least 6 characters long"
      },
      confirmPassword: "Please confirm your password",
      email: "Please enter a valid email address"
    },
    submitHandler: function(form) {
      form.submit();
    }
  });
});