$(document).ready(function(){
    console.log('init');

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {        
        console.log('signed in as ' + user.uid);

        firebase.database().ref('pending').on("child_added", function(data) {
          console.log(data);
          addLink(data.val());
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

});

function addLink(url) {
  var elem = $('<div></div>');
  elem.addClass('buddy');
  elem.css('display', 'block');

  var img = $('<div></div>');
  img.addClass('avatar');
  img.css("display", 'block')
  img.css('background-image', 'url(' + url + ')');
  elem.append(img);

  elem.on("swiperight", function(){
    $(this).addClass('rotate-left').delay(700).fadeOut(1);
    $('.buddy').find('.status').remove();

    $(this).append('<div class="status like">Like!</div>');      
    if ( $(this).is(':last-child') ) {
      $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
     } else {
        $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
     }
  });

  elem.on("swipeleft", function(){
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

  $('#container').append(elem);
}
    