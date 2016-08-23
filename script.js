$(document).ready(function(){
    console.log('init');

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {        
            console.log('signed in as ' + user.uid);

            firebase.database().ref('pending').on("child_added", function(data) {
                console.log(data);
                addLink(data.val(), data.key);
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

function addLink(url, id) {
    var elem = $('<div></div>');
    elem.addClass('buddy');
    elem.css('display', 'block');

    var img = $('<div></div>');
    img.addClass('avatar');
    img.css("display", 'block')
    img.css('background-image', 'url(' + url + ')');
    elem.append(img);

    elem.on("swiperight", function(){
        if ($(this).hasClass('rotate-left') || 
            $(this).hasClass('rotate-right')) {
            return;
        }

        $(this).addClass('rotate-left').delay(700).fadeOut(1);
        $(this).append('<div class="status like">Like!</div>');

        firebase.database().ref('pending/' + id).remove();
        firebase.database().ref('right').push(url);

        console.log('swiperight on ' + url);
    });

    elem.on("swipeleft", function(){
        if ($(this).hasClass('rotate-left') || 
            $(this).hasClass('rotate-right')) {
            return;
        }

        $(this).addClass('rotate-right').delay(700).fadeOut(1);
        $(this).append('<div class="status dislike">Dislike!</div>');

        firebase.database().ref('pending/' + id).remove();
        firebase.database().ref('left').push(url);

        console.log('swipeleft on ' + url);
    });

    $('#container').append(elem);
}
