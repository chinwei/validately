webpackJsonp([1],[,,,,,,,,,,,,function(e,t,i){i(57);var n=i(2)(i(43),i(112),"data-v-56cb8c30",null);e.exports=n.exports},,,,,,,,,,,,,,,,,,,,,,,,function(e,t,i){i(54);var n=i(2)(i(45),i(109),"data-v-381070d2",null);e.exports=n.exports},function(e,t,i){"use strict";var n=i(20),s=i(117),r=i(104),a=i.n(r),o=i(107),c=i.n(o),u=i(105),l=i.n(u);n.a.use(s.a),t.a=new s.a({routes:[{path:"/",name:"project-list",component:l.a},{path:"/projects/new",name:"new-project",component:a.a},{path:"/projects/:id/edit",name:"edit-project",component:a.a},{path:"/projects/:id/",name:"view-project",component:c.a}]})},function(e,t){},function(e,t,i){i(61);var n=i(2)(i(40),i(116),null,null);e.exports=n.exports},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(3),s=i.n(n),r=i(103),a=i.n(r),o={apiKey:"AIzaSyA_2Bu81WuWrjLoJHP3EFDo41jYgNJ8BUM",authDomain:"validately-948d9.firebaseapp.com",databaseURL:"https://validately-948d9.firebaseio.com",projectId:"validately-948d9",storageBucket:"validately-948d9.appspot.com",messagingSenderId:"354991934469"};s.a.initializeApp(o),t.default={name:"app",components:{AppBar:a.a},created:function(){var e=this;s.a.auth().onAuthStateChanged(function(t){if(t){e.user=t;var i=s.a.database().ref("/users/").child(e.user.uid).once("value",function(t){null!==t.val()?console.log(e.user.email,"user already exists"):i=s.a.database().ref("/users/"+e.user.uid).set({displayName:e.user.displayName,email:e.user.email})})}else console.log("not signed in")})},data:function(){return{user:{}}}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"button-primary",props:{label:"",disabled:!1},methods:{clickHandler:function(){this.$emit("action")}}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(3),s=i.n(n),r=i(32),a=(i.n(r),i(12)),o=i.n(a);t.default={name:"app-bar",created:function(){},methods:{goBack:function(){this.$router.replace("/")},goToProject:function(e){this.$router.push({path:e})},loginUser:function(){console.log(this);var e=this;e.isLoading=!0;var t=new s.a.auth.FacebookAuthProvider;s.a.auth().signInWithPopup(t).then(function(t){console.log(this);var i=(t.credential.accessToken,t.user);e.isLoggedIn=!0,e.isLoading=!1,console.log(i)}).catch(function(e){e.code,e.message,e.email,e.credential})},logOut:function(){var e=this;this.isLoggedIn=!1,s.a.auth().signOut().then(function(){e.$router.go("/")}).catch(function(e){})}},components:{ButtonPrimary:o.a},props:{user:{}},data:function(){return{isLoggedIn:!1,isLoading:!1}}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"button-primary",props:{label:"",disabled:!1},methods:{clickHandler:function(){this.$emit("action")}}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(3),s=i.n(n),r=i(93),a=i.n(r),o=i(91),c=i.n(o),u=i(33),l=i.n(u),d=i(102),p=i.n(d);t.default={name:"edit-project",mounted:function(){var e=this;e.quill=new c.a("#editor",{modules:{toolbar:[[{header:[1,2,!1]}],["bold","italic","underline"],["image","code-block"]]},placeholder:"hello there!",theme:"snow"});var t=s.a.database().ref("projects/"+this.$route.params.id),i=s.a.database().ref("writeup/"+this.$route.params.id);void 0!==this.$route.params.id?(t.once("value",function(t){e.project=t.val()}),i.once("value",function(t){e.writeup=t.val(),e.quill.setContents(e.writeup.contentDelta)})):console.log("nope, this is a new project")},props:{user:{}},components:{ButtonPrimary:p.a},methods:{handleSubmit:function(e){var t=this,i=new Date,n={content:l()("#editor .ql-editor").html(),contentDelta:t.quill.getContents()},r={title:t.project.title,desc:t.project.desc,time:Date.parse(i).toString(),owner:{uid:t.user.uid,displayName:t.user.displayName}};void 0!==this.$route.params.id?r.url=t.$route.params.id:r.url=a.a.generate();var o=s.a.database().ref("/projects/"+r.url),c=s.a.database().ref("/writeup/"+r.url);o.set(r),c.set(n),t.$router.push("/projects/"+r.url)}},data:function(){return{project:{},writeup:{}}}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(3),s=i.n(n),r=i(32),a=(i.n(r),i(12)),o=i.n(a);t.default={name:"login-overlay",methods:{loginUser:function(){console.log(this);var e=this;e.isLoading=!0;var t=new s.a.auth.FacebookAuthProvider;s.a.auth().signInWithPopup(t).then(function(t){console.log(this);t.credential.accessToken,t.user;e.isLoggedIn=!0,e.isLoading=!1,e.hideOverlay()}).catch(function(e){e.code,e.message,e.email,e.credential})},hideOverlay:function(){this.$emit("hideOverlay")}},components:{ButtonPrimary:o.a},props:{user:{},isVisible:!1},data:function(){return{isLoggedIn:!1,isLoading:!1}}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(3),s=i.n(n),r=i(35),a=i.n(r),o=i(106),c=i.n(o),u=i(12),l=i.n(u),d=i(36),p=i.n(d);t.default={name:"project-list",created:function(){console.log(this.user);var e=this;this.getCreatedProjects(),this.getLikedProjects(),s.a.database().ref("projects/").orderByChild("time").limitToLast(5).on("child_added",function(t){e.projects.push(t.val()),e.projectObj[t.key]=t.val()})},mounted:function(){var e=this;s.a.database().ref("projects/").orderByChild("time").limitToLast(5).on("value",function(t){e.projectObj=t.val()})},components:{ProjectListItem:c.a,ButtonPrimary:l.a,LoginOverlay:p.a},props:{user:{}},methods:{goToProject:function(e){this.$router.push({path:e})},goToNewProject:function(){this.user.uid?this.goToProject("/projects/new"):this.isVisible=!0},clickHandler:function(){this.$router.push({path:path})},getCreatedProjects:function(){var e=this;e.user.uid&&s.a.database().ref("projects/").orderByChild("owner/uid").equalTo(e.user.uid).limitToLast(5).on("value",function(t){e.currentUserProjectObj=t.val()})},getLikedProjects:function(){var e=this;this.user.uid&&s.a.database().ref("users/"+this.user.uid).on("value",function(t){e.currentUserTargetObj=t.val()})},hideOverlay:function(){this.isVisible=!1}},computed:{listArray:function(){var e=a.a.map(this.projects,function(e,t){return e}),t=a.a.sortBy(e,function(e,i){return t});return t.reverse()}},watch:{user:function(e){console.log("user..",e),this.getCreatedProjects(),this.getLikedProjects()}},data:function(){return{projects:[],projectObj:{},currentUserProjectObj:{},currentUserTargetObj:{},isVisible:!1}}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(35),s=i.n(n);t.default={name:"project-list-item",methods:{clickHandler:function(){this.$emit("action")}},props:{item:{},owner:{}},computed:{likedCount:function(){if(this.item){return s.a.keys(this.item.liked).length}}},data:function(){return{survey:{}}}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(3),s=i.n(n),r=i(33),a=(i.n(r),i(12)),o=i.n(a),c=i(36),u=i.n(c);t.default={name:"view-project",created:function(){var e=this;this.projectDB=s.a.database().ref("projects/"+this.$route.params.id),this.writeupDB=s.a.database().ref("writeup/"+this.$route.params.id),this.projectDB.once("value",function(t){e.project=t.val(),s.a.database().ref("users/"+e.user.uid+"/likes/"+t.key).on("value",function(t){e.likes=!!t.val()})}),this.writeupDB.once("value",function(t){e.writeup=t.val()})},mounted:function(){var e,t=this;!function(e,t,i){var n,s=e.getElementsByTagName(t)[0];e.getElementById(i)||(n=e.createElement(t),n.id=i,n.src="//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=526030481081547",s.parentNode.insertBefore(n,s))}(document,"script","facebook-jssdk"),e&&e.XFBML.parse(),s.a.database().ref("projects/"+this.projectDB.key+"/liked/").on("value",function(e){t.likedCount=e.numChildren()})},props:{user:{}},watch:{user:function(e){var t=this;console.log("user changed!",e),this.projectDB.once("value",function(e){t.project=e.val(),s.a.database().ref("users/"+t.user.uid+"/likes/"+e.key).on("value",function(e){t.likes=!!e.val()})})}},components:{ButtonPrimary:o.a,LoginOverlay:u.a},methods:{hideOverlay:function(){this.isVisible=!1},goBack:function(){this.$router.replace("/projects/")},editProject:function(){this.$router.push(this.$route.path+"/edit")},toggleLike:function(){var e=this,t=s.a.database().ref("users/"+this.user.uid+"/likes/"+this.projectDB.key),i=s.a.database().ref("projects/"+this.projectDB.key+"/liked/");t.transaction(function(t){return t=!t,t||(t=null),e.likes=t,t}),console.log("user id:",this.user.uid),i.child(this.user.uid).transaction(function(e){return e=!e,e||(e=null),e})},onLikeTrigger:function(){this.user.uid?this.toggleLike():this.isVisible=!0}},data:function(){return{project:{},writeup:{},owner:{},likes:!1,likedCount:"",isVisible:!1}}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(20),s=i(39),r=i.n(s),a=i(37),o=i(38);i.n(o);n.a.config.productionTip=!1,window.App=new n.a({el:"#app",router:a.a,template:"<App/>",components:{App:r.a}})},,,,function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,i){i(55);var n=i(2)(i(41),i(110),"data-v-3caaa050",null);e.exports=n.exports},function(e,t,i){i(56);var n=i(2)(i(42),i(111),null,null);e.exports=n.exports},function(e,t,i){i(60);var n=i(2)(i(44),i(115),null,null);e.exports=n.exports},function(e,t,i){i(58);var n=i(2)(i(46),i(113),null,null);e.exports=n.exports},function(e,t,i){i(53);var n=i(2)(i(47),i(108),"data-v-07c26c6c",null);e.exports=n.exports},function(e,t,i){i(59);var n=i(2)(i(48),i(114),null,null);e.exports=n.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.item?i("div",{staticClass:"list-item",on:{click:e.clickHandler}},[i("h1",[e._v(e._s(e.item.title)+" "),i("span",{staticClass:"name"},[e._v(e._s(e.item.owner.displayName))])]),e._v(" "),i("span",{staticClass:"byline"},[e._v(e._s(e.item.desc))]),e._v(" "),i("div",{staticStyle:{"margin-top":"8px"}},[i("svg",{staticClass:"like-icon",attrs:{viewBox:"0 0 100 100",width:"16",height:"16"}},[i("use",{attrs:{"xlink:href":"./static/assets/sprites.svg#heart"}})]),e._v(" "),i("span",{staticClass:"liked-count"},[e._v(e._s(e.likedCount))])])]):e._e()},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"overlay",class:{"is--visible":e.isVisible}},[i("div",{staticClass:"overlay__content"},[i("a",{staticClass:"overlay__close-btn",attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.hideOverlay(t)}}},[e._v("Close")]),e._v(" "),i("svg",{staticClass:"link",attrs:{width:"150",height:"50"}},[i("use",{attrs:{"xlink:href":"./static/assets/sprites.svg#logo"}})]),e._v(" "),i("h2",[e._v("Join the community")]),e._v(" "),i("p",[e._v("Validately is a community for people to contribute and grow ideas. Join us :)")]),e._v(" "),i("button-primary",{class:{"is--loading":e.isLoading},attrs:{label:"Login with Facebook"},on:{action:e.loginUser}})],1)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"button button--primary",attrs:{disabled:e.disabled},on:{click:e.clickHandler}},[e._v(e._s(e.label))])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-bar"},[i("svg",{staticClass:"link",attrs:{width:"150",height:"50"},on:{click:e.goBack}},[i("use",{attrs:{"xlink:href":"./static/assets/sprites.svg#logo"}})]),e._v(" "),i("span",[e.user.uid?e._e():i("button-primary",{class:{"is--loading":e.isLoading},attrs:{label:"Login with Facebook"},on:{action:e.loginUser}}),e._v(" "),e.user.uid?i("strong",{on:{click:e.logOut}},[e._v(e._s(e.user.displayName))]):e._e()],1)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"button button--primary",attrs:{disabled:e.disabled},on:{click:e.clickHandler}},[e._v(e._s(e.label))])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container"},[i("login-overlay",{attrs:{isVisible:e.isVisible},on:{hideOverlay:e.hideOverlay}}),e._v(" "),i("div",{staticClass:"banner banner--main"},[e._v("\n    Help grow ideas\n  ")]),e._v(" "),i("div",{staticClass:"content"},[i("article",[i("div",{staticClass:"list__header"},[i("h1",[e._v("Projects You Created")]),e._v(" "),i("button-primary",{attrs:{label:"New Project"},on:{action:e.goToNewProject}})],1),e._v(" "),e._l(e.currentUserProjectObj,function(t,n){return i("project-list-item",{key:t,attrs:{item:t},on:{action:function(i){e.goToProject("projects/"+t.url)}}})}),e._v(" "),e.user.uid?i("div",{staticClass:"list__header",staticStyle:{"margin-top":"32px"}},[i("h1",[e._v("Projects You Like")])]):e._e(),e._v(" "),e._l(e.currentUserTargetObj.likes,function(t,n){return i("project-list-item",{key:t,attrs:{item:e.projectObj[n]},on:{action:function(t){e.goToProject("projects/"+e.projectObj[n].url)}}})}),e._v(" "),e._m(0),e._v(" "),e._l(e.listArray,function(t,n){return i("project-list-item",{key:t,attrs:{item:t},on:{action:function(i){e.goToProject("projects/"+t.url)}}})})],2)])],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"list__header",staticStyle:{"margin-top":"32px"}},[i("h1",[e._v("Recent Projects")])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("login-overlay",{attrs:{isVisible:e.isVisible},on:{hideOverlay:e.hideOverlay}}),e._v(" "),i("div",{staticClass:"banner"},[i("div",{staticClass:"banner__content"},[i("h1",[e._v(e._s(e.project.title))]),e._v(" "),i("p",[e._v(e._s(e.project.desc))]),e._v(" "),i("svg",{staticClass:"like-icon",class:{active:e.likes},attrs:{viewBox:"0 0 100 100",width:"40",height:"40"},on:{click:e.onLikeTrigger}},[i("use",{attrs:{"xlink:href":"./static/assets/sprites.svg#heart"}})])])]),e._v(" "),i("div",{staticClass:"content"},[e.project.owner&&e.project.owner.uid===e.user.uid?i("button-primary",{attrs:{label:"Edit Project"},on:{action:e.editProject}}):e._e(),e._v(" "),e.project.owner?i("p",[e._v("Idea by "+e._s(e.project.owner.displayName))]):e._e(),e._v(" "),i("article",{staticClass:"story"},[e.writeup?i("div",{domProps:{innerHTML:e._s(e.writeup.content)}}):e._e(),e._v(" "),i("div",{staticClass:"fb-comments",attrs:{"data-numposts":"5"}})])],1)],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"edit"}},[i("button-primary",{attrs:{label:"submit"},on:{action:e.handleSubmit}}),e._v(" "),i("div",[i("textarea",{directives:[{name:"model",rawName:"v-model",value:e.project.title,expression:"project.title"}],staticClass:"input--title",attrs:{placeholder:"Name Your Idea...",type:"text"},domProps:{value:e.project.title},on:{input:function(t){t.target.composing||(e.project.title=t.target.value)}}}),e._v(" "),i("textarea",{directives:[{name:"model",rawName:"v-model",value:e.project.desc,expression:"project.desc"}],staticClass:"input__long-text",attrs:{placeholder:"Briefly describe your idea!",type:"text"},domProps:{value:e.project.desc},on:{input:function(t){t.target.composing||(e.project.desc=t.target.value)}}}),e._v(" "),i("div",{attrs:{id:"editor"}})])],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app"}},[i("div",{attrs:{id:"fb-root"}}),e._v(" "),i("app-bar",{attrs:{user:e.user}}),e._v(" "),i("transition",{attrs:{name:"slide-fade"}},[i("router-view",{attrs:{user:e.user}})],1)],1)},staticRenderFns:[]}}],[49]);
//# sourceMappingURL=app.f5abe5f5f85078c5b3bf.js.map