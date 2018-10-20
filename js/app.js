
/*
 * Create a list that holds all of your cards
 */
var cards = [];
var cardsName = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];
var openCards = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
$('.deck').each(function() {
    $(this).find('li').each(function() {
        cards.push($(this));
    });
});
var temp = 0;

cardsName = shuffle(cardsName);

var cardNumber = 0;
$('.deck').each(function() {
    $(this).find('li').find('i').each(function() {
        $(this).removeAttr('class');
        $(this).addClass(cardsName[cardNumber]);
        cardNumber++;
    });
});

//console.log($($(cards[0][0]).find('i')[0]).attr('class'));
$('.deck').each(function() {
    $(this).find('li').find('i').each(function() {
        var tempClass = $($(cards[temp][0]).find('i')[0]).attr('class');
        $(this).removeAttr('class');
        $(this).addClass(tempClass);
        temp++;
    });
});
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
var moves = 0,
    stars = 3;

removeProperties = function(prop) {
    setTimeout(function() {
        prop.removeClass('show open animated zoomIn');
        openCards[0].removeClass('show open animated zoomIn');
        openCards = [];
    }, 400);
};

showCardOnClick = function(clickEvent) {
    clickEvent.on('click', function() {
        moves++;
        if (moves === 16) {

        } else if (moves > 16 && moves <= 25) {
            $('section ul li').hide();
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            stars = 2;
        } else if (moves > 25) {
            $('section ul li').hide();
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            stars = 1;
        }
        $('.moves').html(moves);
        if ((openCards.length % 2) === 0) {
            $(this).addClass('show open animated zoomIn');
            $(this).off('click');
            openCards.push($(this));
        } else if (openCards.length !== 0) {
            $(this).addClass('show open animated zoomIn');

            var self = $(this);
            for (var i = 0; i < openCards.length; i++) {
                if (openCards[i].find('i').attr('class') === self.find('i').attr('class')) {
                    
                    self.removeClass('animated wobble');
                    self.addClass('show match animated rubberBand');
                    openCards[i].removeClass('animated wobble');
                    openCards[i].addClass('show match animated rubberBand');
                    console.log('match');
                    $(this).off('click');
                    
                    openCards = [];
                    break;
                } else {
                    self.addClass('show open animated wobble');
                    removeProperties(self);
                    openCards[0].on('click', showCardOnClick(openCards[0]));
                    console.log('no match');
                }
            }
        }
        if ($('.deck').find('.match').length === 16) {
            gameOver(function() {
                $('.deck').each(function() {
                    swal({
                        title: 'Sweet!',
                        text: 'You won!',
                        imageUrl: 'thumbs-up.jpg',
                        allowOutsideClick: false,
                        showCancelButton: true,
                        confirmButtonText: 'Retry',
                        confirmButtonColor: '#00cc00',
                        cancelButtonText: 'Quit',
                        cancelButtonColor: '#ff0000'
                    }).then(function() {
                        location.reload();
                    }, function(dismiss) {
                        console.log('done');
                    });

                });
            }, 300);
        }


    });
};

for (var i = 0; i < cards.length; i++) {
    cards[i].on('click', showCardOnClick(cards[i]));
}

$('.restart').on('click', function() {
    location.reload();
});



//credit to https://github.com/ervaibhavkumar/Udacity-Memory-Game/blob/master/css/app.js for helping me figure out how the event listener functions work! This was a tough one!












