const panel = {
    type:'info',
    text:'',
    autoclose:false,
    success:function(text, autoclose = false){
        this.type = 'success';
        this.text = text;
        this.autoclose = autoclose;
        this.showPanel(text);
    },

    info:function(text, autoclose = false){
        this.type = 'info';
        this.text = text;
        this.autoclose = autoclose;
        this.showPanel(text);
    },

    warning:function(text, autoclose = false){
        this.type = 'warning';
        this.text = text;
        this.autoclose = autoclose;
        this.showPanel(text);
    },

    danger:function(text, autoclose = false){
        this.type = 'danger';
        this.text = text;
        this.autoclose = autoclose;
        this.showPanel(text);
    },
    showPanel:function(){
        let html = `
        <div id="panel" class="${this.type}">
            <p>${this.text}</p>
            ${this.autoclose===false?'<button type="button" onclick="panel.closePanel()">&times;</button>':''}
        </div>`;
        if(document.getElementById("panel") !==null){
            this.closePanel();
        }
        document.querySelector("body").insertAdjacentHTML('afterbegin' , html);
        if(this.autoclose){
            setTimeout(()=> {
                this.closePanel();
            }, 3000);
        }
    }, 
    closePanel(){
        document.getElementById("panel").remove();
    }
};
