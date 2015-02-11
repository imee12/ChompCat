
$(document).ready(function () {
    foodies.init();
    setInterval(function() {


    }, 5000);
});




var foodies = {

    init: function() {
        foodies.initStyling();
        foodies.initSignup();

        foodies.initEvents();
    },

    initStyling: function(){

    },



    ///////////  THIS SIGNS UP NEW USER //////////
    initSignup: function () {
        $('.signup').on('click', function(event) {
            event.preventDefault();
            console.log('signup button works');

            var newuser = {

                username: $(this).siblings('input[name="username"]').val(),

                status: "loggedin",
            };
            /////////PRINTS MESSAGE TO USER IN HEADER

            var username=$('input:text').val();
            $(".username").append('<h2> Welcome '   + username  +  '! </h2>' );
            console.log(newuser);
            localStorage.username = $('input:text').val();

            foodies.signup(newuser);

        });
    },
    initEvents: function (){


        ////////NOW ENTERING CHOMP CHAT ///////////
        $(".enterroom").on('click', function (event) {
            console.log("enterroom works");

            $(".room1").show();
            $(".chatbox").show();
            $(".msgbox").addClass("active");
            $(".enterroom").hide()
            $(".loginscreen").hide();
            $(".secondgroup").addClass("active");
            $(".firstgroup").show();
            $(".header2").show();
            //$(".home").show();
            foodies.renderRoom();

        });

        ////////SENDING A MESSAGE IN CHOMP CHAT////////

        $(".send").on('click', function (event){
            event.preventDefault();
            console.log("sendmessage button works");



            var newMsg = {
                username: (localStorage.username),
                msg: $('input[name=newmsg]').val(),

            };
            $("#createMsg")[0].reset();
            foodies.sendmsg(newMsg);

        });

        ///////////THIS WILL DELETE A MESSAGE IN CHOMP CHAT/////////
        $(".room1").on('click', '.deletemsgx', function (event) {
            event.preventDefault();
            console.log("delete message button works");
            var msgid = $(this).closest('article').data('msgid');
            console.log(msgid);
            foodies.deletemsg(msgid);
        });


        // $(".header2").on('click', '.home', function(event){
        //   event.preventDefault();
        //   console.log("home button works");
        //   $(".room1").hide();
        //   $(".chatbox").hide();
        //   $(".msgbox").addClass("notactive");
        //   $(".enterroom").show()
        //   $(".loginscreen").show();
        //   $(".secondgroup").addClass("notactive");
        //   $(".firstgroup").show();
        //   $(".header2").hide();
        //   $(".homex").hide();
        //
        //
        // });
        //


    },





    signup: function (newuser) {
        $.ajax({
            url:'http://tiy-fee-rest.herokuapp.com/collections/foodies' + '-' + 'users',
            data: newuser,
            type: 'POST',
            success: function (data) {
                console.log(data);

                $(".loginbox").hide();
                $(".username").show();
                $(".chatrooms").show();

            }

        });
    },





    sendmsg: function (msg) {
        $.ajax ({
            url:'http://tiy-fee-rest.herokuapp.com/collections/foodies' + '-' + 'room4',
            data: msg,
            type: "POST",
            success: function (data) {
                console.log(msg);


                foodies.renderRoom();
            },
            error: function (error) {
                console.log(error);
            }
        });
    },




    renderRoom: function () {
        $.ajax ({
            url:'http://tiy-fee-rest.herokuapp.com/collections/foodies' + '-' + 'room4',
            //data: msg,
            type: 'GET',
            success: function (msg) {
                var roomTemplate = _.template(template.room1);
                var markup= "";
                _.each(msg, function (item, index, array) {

                    markup +=roomTemplate(item);
                });
                console.log('markup is ...');
                $('.chatbox').html(markup);
            },
            error: function (error) {
                console.log("error");
            }
        });
    },


    deletemsg: function (id) {

        $.ajax({
            url:'http://tiy-fee-rest.herokuapp.com/collections/foodies' + '-' + 'room4/' + id,
            type: 'DELETE',
            success: function (data) {
                console.log(data);
                foodies.renderRoom();
            },
            error: function (err) {
                console.log(err);
            }
        });
    },
};
