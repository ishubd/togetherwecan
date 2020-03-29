const TypeWriter = function(txtElement, words, wait = 50) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type method
TypeWriter.prototype.type = function() {
    // current index of word
    const current = this.wordIndex % this.words.length;
    // get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if(this.isDeleting) {
        // remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    }
    else {
        // add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // initial type speed
    let typeSpeed = 100;

    if(this.isDeleting) {
        typeSpeed /=2;
    }

    // if word is complete
    if(!this.isDeleting && this.txt == fullTxt) {
        // make pause at end
        typeSpeed = this.wait;
        // set delet to true
        this.isDeleting = true;
    }
    else if(this.isDeleting && this.txt == '') {
        this.isDeleting = false;
        // make to next word
        this.wordIndex++;
        // pause before start typing
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), 200)
}

// init on DOM load
document.addEventListener('DOMContentLoaded', init);

// init app
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // init typeWriter
    new TypeWriter(txtElement, words, wait);
}