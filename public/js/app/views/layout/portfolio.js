

define( [
    'App', 'backbone', 'marionette', 'jquery','text!templates/layout/portfolioTemplate.html'
    ,'views/portfolio/PortfolioView'
    , 'views/portfolio/PortfolioBodyView'
    , 'collections/portfolio/PortfolioFinalCollectionView'
    , 'collections/portfolio/PortfolioGridCollectionView'
    , 'collections/portfolio/PortfolioColorCollectionView'
    , 'collections/portfolio/PortfolioTypeCollectionView'
    ,'../../../plugins/select2/select2.min'


],
    function(App, Backbone, Marionette, $, template,PortfolioView,PortfolioBodyView,PortfolioFinalCollectionView
        ,PortfolioGridCollectionView,PortfolioColorCollectionView,PortfolioTypeCollectionView) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.Layout.extend( {
            template: function(){
                return template;
            },
            categoryID: null,
            typeList : null,
            initialize : function() {
                var self = this;
               // this.collectionView = new HistoryCollectionView;
                this.typeList = [];

                this.bind('projectWrite',function(project){
//                    var total = this.portfolioFinalCollectionView.collection.length;
//                    for (var i = 0; i < total; i ++) {
//                        this.portfolioFinalCollectionView.collection.remove(i);
//                        this.portfolioGridCollectionView.collection.remove(i);
//                        this.portfolioColorCollectionView.collection.remove(i);
//                        this.portfolioTypeCollectionView.collection.remove(i);
//                    }

                    this.finalel.close();
                    this.griditem.close();
                    this.mainKeyColor.close();
                    this.typeLayout.close();


                    self.setBody(project);
                });

                this.bind('add_final_field',function(){
                    this.portfolioFinalCollectionView.collection.add({create:true});
                });
                this.bind('add_grid',function(){

                    this.portfolioGridCollectionView.collection.add({create:true});
                });
                this.bind('add_color',function(){
                    this.portfolioColorCollectionView.collection.add({create:true});
                });

                this.bind('add_type',function(){
                    var length = this.portfolioTypeCollectionView.collection.length;
                   this.portfolioTypeCollectionView.collection.add1({create:true,len:length + 1})
                });


                this.bind('data_reload',function(){
                    this.reload();
                });


            },
            create: function(categoryModel) {
                var self = this;
                this.viewItem = new PortfolioView;


                this.viewItem.create(this);
                this.header.show(this.viewItem);
                this.viewItem.bind('onDataChange',function(model){
                    self.collectionView.collection.add(model);
                });

                categoryModel.on('change',function(model){
                    if (model.get('name') === 'portfolio') {
                        self.categoryID = model.get('id');
                    }
                });

                //this.list.show(this.collectionView);
            },
            reload : function() {

                this.body.show(this.viewBody);
                this.viewBody.create(this);

                this.finalel.show(this.portfolioFinalCollectionView);
                this.griditem.show(this.portfolioGridCollectionView);
                this.mainKeyColor.show(this.portfolioColorCollectionView);
                this.typeLayout.show(this.portfolioTypeCollectionView);


                this.portfolioFinalCollectionView.collection.add({create:true});
                this.portfolioGridCollectionView.collection.add({create:true});
                this.portfolioColorCollectionView.collection.add({create:true});
            },
            setBody: function(project){

                $('.nav-tabs a[href=#protfolio-body]').tab('show');
                this.portfolioFinalCollectionView = new PortfolioFinalCollectionView;
                this.portfolioGridCollectionView = new PortfolioGridCollectionView;
                this.portfolioColorCollectionView = new PortfolioColorCollectionView;
                this.portfolioTypeCollectionView = new PortfolioTypeCollectionView;

                if (project) {
                    this.project = project;
                    this.viewBody = new PortfolioBodyView({id:this.project});
                    this.viewBody.create(this);

                } else {
                    this.project = 0;
                    this.viewBody = new PortfolioBodyView();

                    this.body.show(this.viewBody);
                    this.viewBody.create(this);

                    this.finalel.show(this.portfolioFinalCollectionView);
                    this.griditem.show(this.portfolioGridCollectionView);
                    this.mainKeyColor.show(this.portfolioColorCollectionView);
                    this.typeLayout.show(this.portfolioTypeCollectionView);
                    this.portfolioFinalCollectionView.collection.add({create:true});
                    this.portfolioGridCollectionView.collection.add({create:true});
                    this.portfolioColorCollectionView.collection.add({create:true});

                }





            },
            addRinkItem : function() {

            },
            regions: {
                header: "#portfolioHeader",
                body : "#protfolio-body",
                finalel : "#finaloutput",
                griditem : "#griditem",
                mainKeyColor:"#mainKeyColor",
                typeLayout : "#typeBody"

            },
            events: {

                'click .data-delete' : '_itemRemove'
            },
            errorMessage : function(message){
                App.trigger('errorMessage',{'message':message});
            },

            _itemRemove : function(e) {
                var target = this.collectionView.getRemoveItem();
                for (var t in target) {
                    this.collectionView.collection.remove( target[t]);
                }

            }

        });
    });


function loadCSS (url) {
    var link = d.createElement("link");

    var t = new Date();
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url +'?d='+t.getTime();
    d.getElementsByTagName("head")[0].appendChild(link);

}