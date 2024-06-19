document.addEventListener('DOMContentLoaded', function() {
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let firstCard = null;
    let secondCard = null;
    let cardsFlipped = 0;
    let lockBoard = false;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createCardElements() {
        const shuffledValues = [...cardValues, ...cardValues]; // Duplicate values for pairs
        shuffle(shuffledValues);

        const cardsGrid = document.querySelector('.cards-grid');

        shuffledValues.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.value = value;
            card.innerHTML = '<span class="back-face">' + value + '</span>';
            card.addEventListener('click', flipCard);
            cardsGrid.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.value === secondCard.dataset.value;

        if (isMatch) {
            disableCards();
            cardsFlipped += 2;
            if (cardsFlipped === cardValues.length * 2) {
                setTimeout(() => alert('Congratulations! You won the game!'), 500);
            }
        } else {
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetBoard(),
                alert('Letters does not match try again!');
            }, 1000);
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    createCardElements();
});
