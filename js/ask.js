class Ask {
  baseURL = "https://ai-project.technative.dev.f90.co.uk/ai/chicken?query=";
  maxLength = 160;

  constructor() {
    this.askContainer = document.querySelector(".ask");
    if (this.askContainer) {
      this.askInput = this.askContainer.querySelector(".ask__input");
      this.exampleButton = this.askContainer.querySelector(
        ".ask__button-example"
      );
      this.askButton = this.askContainer.querySelector(".ask__button-ask");
      this.resetButton = this.askContainer.querySelector(".ask__button-reset");
      this.charCounter = this.askContainer.querySelector(".ask__char-count");
      this.askLoading = this.askContainer.querySelector(".ask__loading");

      this.resultsContainer = document.querySelector(".results");
      this.resultsList = this.resultsContainer.querySelector(".results__list");
      this.resultsLoading = this.resultsContainer.querySelector(".results__loading");
      this.resultsShowMore = this.resultsContainer.querySelector(".results__show-more-button");
    }
  }

  init() {
    if (!this.askContainer) return;
    this.askInput.addEventListener("input", (e) => this.checkInput(e));
    this.exampleButton.addEventListener("click", (e) => this.setExample(e));
    this.askButton.addEventListener("click", (e) => this.askClicked(e));
    this.resetButton.addEventListener("click", (e) => this.resetClicked(e));
    this.resultsShowMore.addEventListener("click", (e) => this.showMoreClicked(e));
    this.checkInput();
  }

  checkInput() {
    // check submission validity
    const charsRemaining = this.maxLength - this.askInput.value.length;
    if (charsRemaining < 0) {
      this.askButton.disabled = true;
      this.charCounter.classList.add("has-error");
    } else {
      this.askButton.disabled = false;
      this.charCounter.classList.remove("has-error");
    }
    this.charCounter.textContent = `${charsRemaining} characters remaining`;

    // check whether to display example button
    if (this.askInput.value.length === 0) {
      this.askButton.disabled = true;
      this.exampleButton.classList.remove("is-hidden");
    } else {
      this.exampleButton.classList.add("is-hidden");
    }
  }

  setExample(event) {
    event.preventDefault();
    console.log("setting example");
    this.askInput.value =
      "Tell me about some of the best things I could see with a telescope from Brighton (assuming it ever stops raining)";
    this.checkInput();
  }

  resetClicked(event) {
    event.preventDefault();
    this.askInput.value = "";
    this.resetResults();
    this.checkInput();
  }

  askClicked(event) {
    event.preventDefault();
    
    this.resetResults();

    this.askLoading.classList.add("is-loading");

    this.querySearch();
  }

  showMoreClicked(event) {
    event.preventDefault();

    this.resultsLoading.classList.add("is-loading");
    this.resultsShowMore.classList.add("is-shown");

    this.querySearch();
  }

  async querySearch() {

    const url = this.baseURL + this.askInput.value;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      // fake a one second wait, use the two lines below for an instant response
      // const json = await response.json();
      // this.processResults(json);

      await setTimeout(async () => {
        const json = await response.json();
        this.processResults(json.results);
        this.askLoading.classList.remove("is-loading");
        this.resultsLoading.classList.remove("is-loading");
        this.resultsShowMore.classList.remove("is-shown");
        //this.
      }, 1000);
    } catch (error) {
      console.error(error.message);
      this.askLoading.classList.remove("is-loading");
      this.resultsLoading.classList.remove("is-loading");
    }
  }

  processResults(data) {

    if (data.length > 0) {
      this.resultsContainer.classList.add("is-shown");
    } else {
      this.resultsContainer.classList.remove("is-shown");
    }

    data.forEach((result) => {
      const resultsItem = document.createElement("div");
      resultsItem.classList.add("results__item");
      this.resultsList.appendChild(resultsItem);

      const resultsItemTitle = document.createElement("h3");
      resultsItemTitle.classList.add("results__item-title");
      resultsItemTitle.textContent = result.title;
      resultsItem.appendChild(resultsItemTitle);

      const resultsItemDescription = document.createElement("p");
      resultsItemDescription.classList.add("results__item-description");
      resultsItemDescription.textContent = result.description;
      resultsItem.appendChild(resultsItemDescription);
    });
  }

  resetResults() {
    while(this.resultsList.firstChild) {
      this.resultsList.removeChild(this.resultsList.firstChild);
    }
    this.resultsContainer.classList.remove("is-shown");
  }
}



// Expose an instance of the 'Ask' class
export default new Ask();
