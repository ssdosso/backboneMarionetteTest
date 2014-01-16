//define(['App', 'backbone', 'marionette', 'views/WelcomeView', 'views/DesktopHeaderView'],
    define([
        'globals'
        ,'jquery'
        ,'App'
        ,'backbone'
        ,'marionette'
        ,'models/user/UserModel'
        ,'models/etc/ErrorModel'
        ,'views/home/HomeView'
        ,'views/header/DesktopHeaderView'
        , 'views/home/AboutView'
        , 'views/user/ProfileView'
        , 'views/user/sign/SignView'
        , 'views/user/LoginView'
        , 'views/etc/ErrorView'
        ,'views/sidebar/SidebarView'
        ,'models/user/AdminUserModel'
        ,'models/CategoryModel'
        , 'views/layout/Main'
        , 'views/layout/Who'
        , 'views/layout/portfolio'

       , 'modalmanager'

    ],
    function (
        CFG
        ,$
        ,App
        ,Backbone
        ,Marionette
        ,UserModel
        ,ErrorModel
        ,HomeView
        ,DesktopHeaderView
        ,AboutView
        ,ProfileView
        ,SignView
        ,LoginView
        ,ErrorView
        ,SidebarView
        ,AdminUserModel
        ,CategoryModel
        ,MainLayout
        ,WhoLayout
        ,PortfolioLayout

        ) {
    return Backbone.Marionette.Controller.extend({

        initialize:function (options) {
            var scope = this;
            this.App = App;

            App.errorModel = this.errorModel = new ErrorModel();
            App.userModel = new AdminUserModel();

            App.categoryModel = new CategoryModel();
            //       leftRegion: "nav"
//
//           var leftLayout = Backbone.Marionette.Layout.extend({
//                template: sidebarTemplate,
//                regions: {
//                    list: "#friendList"
//                }
//            });
//            App.rightLayout = new RightLayout;



            App.headerRegion.show(new DesktopHeaderView());
            App.leftRegion.show(new SidebarView());

            this.on('errorMessage',function(e){
              //  cfg.stage = 1;

                CFG.State.error = true;
                scope.errorModel.set('message', e.message);
                App.errorRegion.show(new ErrorView);
            });

            App.on('errorMessage',function(e) {

                CFG.State.error = true;
                scope.errorModel.set('message', e.message);
                App.errorRegion.show(new ErrorView);
            });
            App.on("initialize:before", function(options){
                App.userModel.setController(scope);

                if (!App.userModel.get('isLogin')) {
                   // App.headerRegion.close();
                   // App.leftRegion.close();
                    //
                } else {
                   // App.mainRegion.show(self.contentLayout);
                 //   App.leftRegion.show(self.leftMenuView);

                }

            });


            App.on("initialize:after", function(options){
               // App.userModel.setController(scope);
                    if (!App.userModel.get('isLogin')) {
                      //  App.leftRegion.close();
                        App.appRouter.navigate('/login',true);
                    } else {

                    }

            });

            /**
             * view 페이지가 로딩이 되면 무조건 실행되는 이벤트
             */
            App.mainRegion.on("show", function(){
                if( CFG.State.error === true ) {
                    App.errorRegion.close();
                }
              //  $('body').off('.alert.data-api');
            });

        },
        /**
         * router 에서 이 함수를 통해 사이트 전체 퍼미션 체크를 한다.
         * @param route
         * @param fragment
         * @returns {boolean}
         */
        permissionCheck: function(route,fragment) {

            var regexp = new RegExp('game|profile');
            var game = new RegExp('game');
            var self = this;

            $('#page').modalmanager('loading');

           // $modal.modal('loading');
              //  console.log(regexp)
            if (regexp.test(fragment)) {
                  if(App.userModel.get('isLogin')) {
                      if (game.test(fragment)) {

                         // App.rightRegion.show( App.rightLayout);
                         // if (!self.friendCollection) {
                              //self.friendCollection = new FriendCollectionView;
                        //  }

                         //App.rightLayout.list.show(self.friendCollection);

                      }
                      return true;
                  }
            }  else {

                //if(App.rightLayout.list) App.rightLayout.list.close();
                //App.rightRegion.close();

                return true;
            }


        },

        //메인 페이지
        index:function () {

                if (App.userModel.get('isLogin')) {
                    this.currentLayout = new MainLayout();
                    App.mainRegion.show(this.currentLayout);
                    this.currentLayout.create(App.categoryModel);
                }

        },
        showWho : function() {
            this.currentLayout = new WhoLayout();
            App.mainRegion.show(this.currentLayout);
            this.currentLayout.create(App.categoryModel);
        },
        showPortfolio : function() {
            this.currentLayout = new PortfolioLayout();
            App.mainRegion.show(this.currentLayout);
            this.currentLayout.create(App.categoryModel);
        },
        showAbout: function() {
           // this.BeforeRender();
            App.mainRegion.show(new AboutView());
        },
        errorView: function() {
          console.log('err')
        },
        showProfile: function() {
            if (!App.profileModel) App.profileModel = new userProfileModel({uid:App.userModel.get('uid')});
            App.profileModel.getProfile(function(){
                App.mainRegion.show(new ProfileView())
            });

        },
        showLogout: function() {
            App.userModel.trigger('logout');

            if (App.profileModel) {
                App.profileModel.close();
                delete App.profileModel;
            }
            if (this.friendCollection) {
                 this.friendCollection.close();
                delete this.friendCollection;
               // this.friendCollection = null;
            }
        },
        showLogin: function() {
            App.mainRegion.show(new LoginView());
        },
        showGame: function() {
            App.mainRegion.show(new GameView());
        } ,
        showSignup: function() {
            App.mainRegion.show(new SignView());
        },
        gamePlay: function(game) {

            App.mainRegion.show(new GamePlay({game:game}))
        }


    });
});