define( [
    'App', 'backbone', 'underscore','marionette', 'jquery','text!templates/portfolio/portfolioTemplate.html'
    ,'collections/ProjectSelectListCollectionView'
],
    function(App, Backbone,_, Marionette, $, template,ProjectSelectListCollectionView) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            onBeforeRender: function(){
                var self = this;
                this.template =   function(){
                    return _.template( template, {
                        data:self.model
                    } );
                }

            },
            //template :template,
            initialize : function() {
                App.categoryModel.getCategory('portfolio');
                var self = this;

//                var Model = Backbone.Blueark.Model.extend({
//                    url:'/project/list',
//
//                    initialize: function() {
//                    },
//                    defaults: {},
//                    saveData : function(data) {
//                        this.set(data);
//                        this.save( this.attributes, {
//                            wait:true,
//                            success:function(model, response) {
//                                if (model.get('error') < 0) {
//                                    self.errorMessage(model.get('message'));
//                                } else {
//                                    alert("추가했습니다.");
//                                    self.trigger('onDataChange',model);
//                                }
//                            },
//                            error: function(model, error) {
//                                console.log(model.toJSON());
//                                console.log('error.responseText');
//                            }
//                        });
//
//                    }
//                });
//                this.model = new Model;
//                this.model.fetch({success:function(model){
//                    for (var i in model.attributes) {
//                            var row = model.attributes[i];
//
//                        var el = '<option value="프로모션">'+row.date+'  '+row.project_name+'</option>';
//                        $('.project_name_search').append(el);
//
//                    }
//                }});

               var template = '<div id="project_search_item" class="col-sm-2">'+

                '</div>';
                var ColorLayout =  Backbone.Marionette.Layout.extend( {
                    el :'#project_search',
                    template: _.template(template),
                    regions :{
                        body:'#project_search_item'
                    },
                    events : {

                    },
                });

                this.projectSelectListCollectionView = new ProjectSelectListCollectionView();



                var runSelect2 = function () {
                    $(".search-select").select2({
                        placeholder: "Select a State",
                        allowClear: true
                    });
                };
                this.on('show',function(){
                    this.projectSelectLayout = new ColorLayout;
                    this.projectSelectLayout.render();

                    this.projectSelectLayout.body.show(this.projectSelectListCollectionView);
                    this.projectSelectListCollectionView.fetch();
                    runSelect2();
                    $(self.el).find('.date-picker').datepicker({
                        autoclose: true
                    });

                    var el = $(self.el).find('.summernote-history');

                    el.summernote({
                        lang: 'ko-KR',
                        toolbar: []
                    });
                    $('.note-toolbar').remove();
                })



            },
            create : function(layout) {
                  this.layout = layout;
            },
            events: {
                'click .project-edit ':'_editProject',
                'click .project-write':'_createProject'
            },
            resetProgress: function() {

                $(this.el).find('.progress-bar').css('width',  '0%');
            },
            _editProject : function() {

                this.layout.trigger('projectWrite',$('#project_search_item select').val());
            },
            _createProject: function() {

                this.layout.trigger('projectWrite');
            },
            _save: function(e) {
                e.stopPropagation();
                var el = $(this.el);

                if (!App.categoryModel.get('id')) {
                    alert('잘못된 접근입니다.');
                    return;
                }
                var categoryID = App.categoryModel.get('id');
                if($.trim(el.find('.date-history').val()) === '' ) {
                    alert('연도를 선택하세요');
                    el.find('.date-history').focus();
                    return false;
                }



                if(el.find('.summernote-history').code() ==='') {
                    alert('내용을 입력하세요');
                    return false;
                }

                var data = {
                    categoryID:categoryID,
                    date: el.find('.date-history').val(),
                    history:el.find('.summernote-history').code()

                }

                var model = new  this.Model;
                model.saveData(data);
                return false;
            },
            errorMessage : function(message){
                App.trigger('errorMessage',{'message':message});
            }

        });
    });