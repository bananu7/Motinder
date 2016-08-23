$(document).ready(function(){
    console.log('init');

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {        
        console.log('signed in as ' + user.uid);

        firebaseRef.on("value", function(snapshot) {
          console.log(snapshot.val());
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
      } else {
        firebase.auth().signInWithEmailAndPassword('example@example.com', 'example').catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log('auth error: ' + error.message)
        });
      }
    });

    $(".buddy").on("swiperight",function(){
      $(this).addClass('rotate-left').delay(700).fadeOut(1);
      $('.buddy').find('.status').remove();

      $(this).append('<div class="status like">Like!</div>');      
      if ( $(this).is(':last-child') ) {
        $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
       } else {
          $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
       }
    });  

   $(".buddy").on("swipeleft",function(){
    $(this).addClass('rotate-right').delay(700).fadeOut(1);
    $('.buddy').find('.status').remove();
    $(this).append('<div class="status dislike">Dislike!</div>');

    if ( $(this).is(':last-child') ) {
     $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
      alert('Na-na!');
     } else {
        $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
    } 
  });

});