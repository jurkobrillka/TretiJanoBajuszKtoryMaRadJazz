class Slider extends HTMLElement{


    constructor() {
        super();


        this.attachShadow({mode: "open"});
        this.minimal = this.getAttribute("minimal");
        this.maximal = this.getAttribute("maximal");

        this.block = document.createElement("div");
        this.block.id = "block";


        this.unumIput = document.createElement("input");
        this.unumIput.id = "inputNumber";
        this.unumIput.type = "number";
        this.unumIput.setAttribute("min",this.minimal);
        this.unumIput.setAttribute("max",this.maximal);

        this.inputRange = document.createElement("input");
        this.inputRange.type = "range";
        this.inputRange.id = "range"


        this.block.appendChild(this.inputRange);

        this.block.appendChild(this.unumIput);


        this.unumIput.value = this.inputRange.value;
        console.log(this.inputRange.value)
        this.inputRange.addEventListener('input',  ()=>{
    this.unumIput.value = this.inputRange.value;
})


        this.shadowRoot.appendChild(this.block);




        const lookCss = document.createElement("style");
        lookCss.innerHTML = `
        #block{
            display: flex;
            flex-direction: column;
            padding: 1rem;
           
    justify-self: center;
    justify-content: center;
    justify-items: center;
        }
        
        #range{
            -webkit-appearance: none;
            width: 100%;
            height: 10px;
            background: #ffffff;
            outline: 1px solid #dcdee0;
            -webkit-transition: .2s;
            transition: opacity .2s;
            z-index: 5;
            position: relative;
            margin-bottom: 1.5rem;
            border-radius: 1px;
        }
        
        #range::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 30px;
            height: 20px;
            background: #dcdee0;
            cursor: pointer;
            border-radius: 1px;
        }

        #range::-moz-range-thumb {
            width: 30px;
            height: 20px;
            background: #dcdee0;
            cursor: pointer;
            border-radius: 3px;
        }
        `

        this.shadowRoot.appendChild(lookCss);
    }
}


customElements.define("slider-top", Slider);