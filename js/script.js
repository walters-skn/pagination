function mouseover_on_nav_item(item) {
  if (item.querySelector(".nav-submenu")) {
    item.querySelector(".nav-submenu").setAttribute("style", "display:block");
  }
}

function mouseout_on_nav_item(item) {
  item.querySelector(".nav-submenu").setAttribute("style", "display:none");
}

let searchInputBox = document.querySelector('input[name="search"]');
let searchAutoCompleteBox = document.querySelector(".search-autocomplete");
searchInputBox.onkeyup = function () {
  if (searchInputBox.value) {
    searchAutoCompleteBox.setAttribute("style", "display:block");
  } else {
    searchAutoCompleteBox.setAttribute("style", "display:none");
  }
};

searchInputBox.onblur = function () {
  searchAutoCompleteBox.setAttribute("style", "display:none");
};

let sliderCurrentIndex = 0;
let sliderItems = document.querySelectorAll(".slider-item");
let autoSliderChangeFlag = false;

function sliderChange(sliderIndex, prevIndex) {
  for (let index = 0; index < sliderItems.length; index = index + 1) {
    sliderItems[index].classList.remove(
      "slider-item-scrollin",
      "slider-item-scrollout"
    );
    sliderItems[index].setAttribute("style", "display:none");
  }

  if (prevIndex !== undefined) {
    sliderItems[prevIndex].setAttribute("style", "display:block");
    sliderItems[prevIndex].classList.add("slider-item-scrollout");
  }
  sliderItems[sliderIndex].setAttribute("style", "display:block");
  sliderItems[sliderIndex].classList.add("slider-item-scrollin");
  sliderCurrentIndex = sliderIndex;
}

function bingo() {
  let bingoButton = document.querySelector(".slider-bingo");
  if (bingoButton.innerText == "SPIN") {
    autoSliderChangeFlag = true;
    bingoButton.innerText = "STOP";
    bingoButton.classList.add("stop");
    autoSliderChange(0);
  } else {
    autoSliderChangeFlag = false;
    bingoButton.innerText = "SPIN";
    bingoButton.classList.remove("stop");
  }
}

function autoSliderChange(index) {
  if (autoSliderChangeFlag) {
    let prevIndex = 0;
    if (index == 0) {
      prevIndex = sliderItems.length - 1;
    } else {
      prevIndex = index - 1;
    }
    sliderChange(index, prevIndex);
    if (index >= sliderItems.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
    setTimeout(autoSliderChange.bind(this, index), 200);
  }
}

function prevImage() {
  if (sliderCurrentIndex == 0) {
    sliderChange(sliderItems.length - 1, 0);
  } else {
    sliderChange(sliderCurrentIndex - 1, sliderCurrentIndex);
  }
}

function nextImage() {
  if (sliderCurrentIndex == sliderItems.length - 1) {
    sliderChange(0, sliderItems.length - 1);
  } else {
    sliderChange(sliderCurrentIndex + 1, sliderCurrentIndex);
  }
}

sliderChange(sliderCurrentIndex + 1, sliderCurrentIndex);
