define(["jquery", 'underscore', "backbone",'blueark'],
    function($,_,Backbone) {
        // Creates a new Backbone Model class object
        var Model = Backbone.Blueark.Model.extend({


            initialize: function() {

            },
            saveData: function() {
                var self = this;
                this.save(this.attributes,{
                    success:function(model, response) {
                        alert("업데이트 성공");
                        self.trigger('dataUpdate');
                    }
                })
            }



        });

        // Returns the Model class
        return Model;

    }

);