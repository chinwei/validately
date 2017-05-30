webpackJsonp([1],Array(19).concat([function(t,e,r){r(53);var n=r(2)(r(41),r(108),"data-v-56cb8c30",null);t.exports=n.exports},,,,,,,,,,,,,,,,function(t,e,r){"use strict";var n=r(20),s=r(113),a=r(101),i=r.n(a),o=r(104),c=r.n(o),u=r(102),l=r.n(u);n.a.use(s.a),e.a=new s.a({routes:[{path:"/",name:"project-list",component:l.a},{path:"/projects/new",name:"new-project",component:i.a},{path:"/projects/:id/edit",name:"edit-project",component:i.a},{path:"/projects/:id/",name:"view-project",component:c.a}]})},function(t,e){},function(t,e,r){r(57);var n=r(2)(r(38),r(112),null,null);t.exports=n.exports},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(4),s=r.n(n),a=r(100),i=r.n(a),o={apiKey:"AIzaSyA_2Bu81WuWrjLoJHP3EFDo41jYgNJ8BUM",authDomain:"validately-948d9.firebaseapp.com",databaseURL:"https://validately-948d9.firebaseio.com",projectId:"validately-948d9",storageBucket:"validately-948d9.appspot.com",messagingSenderId:"354991934469"};s.a.initializeApp(o),e.default={name:"app",components:{AppBar:i.a},created:function(){var t=this;s.a.auth().onAuthStateChanged(function(e){if(e){t.user=e;var r=s.a.database().ref("/users/").child(t.user.uid).once("value",function(e){null!==e.val()?console.log(t.user.email,"user already exists"):r=s.a.database().ref("/users/"+t.user.uid).set({displayName:t.user.displayName,email:t.user.email})})}else console.log("not signed in")})},data:function(){return{user:{}}}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"button-primary",props:{label:"",disabled:!1},methods:{clickHandler:function(){this.$emit("action")}}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(4),s=r.n(n),a=r(85),i=(r.n(a),r(19)),o=r.n(i);e.default={name:"app-bar",created:function(){},methods:{goBack:function(){this.$router.replace("/")},goToProject:function(t){this.$router.push({path:t})},loginUser:function(){console.log(this);var t=this;t.isLoading=!0;var e=new s.a.auth.FacebookAuthProvider;s.a.auth().signInWithPopup(e).then(function(e){console.log(this);var r=(e.credential.accessToken,e.user);t.isLoggedIn=!0,t.isLoading=!1,console.log(r)}).catch(function(t){t.code,t.message,t.email,t.credential})},logOut:function(){var t=this;this.isLoggedIn=!1,s.a.auth().signOut().then(function(){t.$router.go("/")}).catch(function(t){})}},components:{ButtonPrimary:o.a},props:{user:{}},data:function(){return{isLoggedIn:!1,isLoading:!1}}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"button-primary",props:{label:"",disabled:!1},methods:{clickHandler:function(){this.$emit("action")}}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(4),s=r.n(n),a=r(90),i=r.n(a),o=r(88),c=r.n(o),u=r(32),l=r.n(u),d=r(99),p=r.n(d);e.default={name:"edit-project",mounted:function(){var t=this;t.quill=new c.a("#editor",{modules:{toolbar:[[{header:[1,2,!1]}],["bold","italic","underline"],["image","code-block"]]},placeholder:"hello there!",theme:"snow"});var e=s.a.database().ref("projects/"+this.$route.params.id),r=s.a.database().ref("writeup/"+this.$route.params.id);void 0!==this.$route.params.id?(e.once("value",function(e){t.project=e.val()}),r.once("value",function(e){t.writeup=e.val(),t.quill.setContents(t.writeup.contentDelta)})):console.log("nope, this is a new project")},props:{user:{}},components:{ButtonPrimary:p.a},methods:{handleSubmit:function(t){var e=this,r=new Date,n={content:l()("#editor .ql-editor").html(),contentDelta:e.quill.getContents()},a={title:e.project.title,desc:e.project.desc,time:Date.parse(r).toString(),owner:{uid:e.user.uid,displayName:e.user.displayName}};void 0!==this.$route.params.id?a.url=e.$route.params.id:a.url=i.a.generate();var o=s.a.database().ref("/projects/"+a.url),c=s.a.database().ref("/writeup/"+a.url);o.set(a),c.set(n),e.$router.push("/projects/"+a.url)}},data:function(){return{project:{},writeup:{}}}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(4),s=r.n(n),a=r(34),i=r.n(a),o=r(103),c=r.n(o),u=r(19),l=r.n(u);e.default={name:"project-list",created:function(){console.log(this.user);var t=this;this.getCreatedProjects(),this.getLikedProjects(),s.a.database().ref("projects/").orderByChild("time").limitToLast(5).on("child_added",function(e){t.projects.push(e.val()),t.projectObj[e.key]=e.val()})},mounted:function(){var t=this;s.a.database().ref("projects/").orderByChild("time").limitToLast(5).on("value",function(e){t.projectObj=e.val()})},components:{ProjectListItem:c.a,ButtonPrimary:l.a},props:{user:{}},methods:{goToProject:function(t){this.$router.push({path:t})},clickHandler:function(){this.$router.push({path:path})},getCreatedProjects:function(){var t=this;t.user.uid&&s.a.database().ref("projects/").orderByChild("owner/uid").equalTo(t.user.uid).limitToLast(5).on("value",function(e){t.currentUserProjectObj=e.val()})},getLikedProjects:function(){var t=this;this.user.uid&&s.a.database().ref("users/"+this.user.uid).on("value",function(e){t.currentUserTargetObj=e.val()})}},computed:{listArray:function(){var t=i.a.map(this.projects,function(t,e){return t}),e=i.a.sortBy(t,function(t,r){return e});return e.reverse()}},watch:{user:function(t){console.log("user..",t),this.getCreatedProjects(),this.getLikedProjects()}},data:function(){return{projects:[],projectObj:{},currentUserProjectObj:{},currentUserTargetObj:{}}}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(34),s=r.n(n);e.default={name:"project-list-item",methods:{clickHandler:function(){this.$emit("action")}},props:{item:{},owner:{}},computed:{likedCount:function(){if(this.item){return s.a.keys(this.item.liked).length}}},data:function(){return{survey:{}}}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(4),s=r.n(n),a=r(32),i=(r.n(a),r(19)),o=r.n(i);e.default={name:"view-project",created:function(){var t=this;this.projectDB=s.a.database().ref("projects/"+this.$route.params.id),this.writeupDB=s.a.database().ref("writeup/"+this.$route.params.id),this.projectDB.once("value",function(e){t.project=e.val(),console.log(e.key),s.a.database().ref("users/"+t.user.uid+"/likes/"+e.key).on("value",function(e){t.likes=!!e.val()})}),this.writeupDB.once("value",function(e){t.writeup=e.val()})},mounted:function(){var t,e=this;!function(t,e,r){var n,s=t.getElementsByTagName(e)[0];t.getElementById(r)||(n=t.createElement(e),n.id=r,n.src="//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=526030481081547",s.parentNode.insertBefore(n,s))}(document,"script","facebook-jssdk"),t&&t.XFBML.parse(),s.a.database().ref("projects/"+this.projectDB.key+"/liked/").on("value",function(t){e.likedCount=t.numChildren()})},props:{user:{}},components:{ButtonPrimary:o.a},methods:{goBack:function(){this.$router.replace("/projects/")},editProject:function(){this.$router.push(this.$route.path+"/edit")},toggleLike:function(){console.log("users/"+this.user.uid+"/likes/"+this.projectDB.key);var t=this,e=s.a.database().ref("users/"+this.user.uid+"/likes/"+this.projectDB.key),r=s.a.database().ref("projects/"+this.projectDB.key+"/liked/");e.transaction(function(e){return e=!e,e||(e=null),t.likes=e,e}),console.log("user id:",this.user.uid),r.child(this.user.uid).transaction(function(t){return t=!t,t||(t=null),t})}},data:function(){return{project:{},writeup:{},owner:{},likes:!0,likedCount:""}}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(20),s=r(37),a=r.n(s),i=r(35),o=r(36);r.n(o);n.a.config.productionTip=!1,window.App=new n.a({el:"#app",router:i.a,template:"<App/>",components:{App:a.a}})},,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,r){r(51);var n=r(2)(r(39),r(106),"data-v-3caaa050",null);t.exports=n.exports},function(t,e,r){r(52);var n=r(2)(r(40),r(107),null,null);t.exports=n.exports},function(t,e,r){r(56);var n=r(2)(r(42),r(111),null,null);t.exports=n.exports},function(t,e,r){r(54);var n=r(2)(r(43),r(109),null,null);t.exports=n.exports},function(t,e,r){r(50);var n=r(2)(r(44),r(105),"data-v-07c26c6c",null);t.exports=n.exports},function(t,e,r){r(55);var n=r(2)(r(45),r(110),null,null);t.exports=n.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.item?r("div",{staticClass:"list-item",on:{click:t.clickHandler}},[r("h1",[t._v(t._s(t.item.title)+" "),r("span",{staticClass:"name"},[t._v(t._s(t.item.owner.displayName))])]),t._v(" "),r("span",{staticClass:"byline"},[t._v(t._s(t.item.desc))]),t._v(" "),r("div",{staticStyle:{"margin-top":"8px"}},[r("svg",{staticClass:"like-icon",attrs:{viewBox:"0 0 100 100",width:"16",height:"16"}},[r("use",{attrs:{"xlink:href":"./static/assets/sprites.svg#heart"}})]),t._v(" "),r("span",{staticClass:"liked-count"},[t._v(t._s(t.likedCount))])])]):t._e()},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"button button--primary",attrs:{disabled:t.disabled},on:{click:t.clickHandler}},[t._v(t._s(t.label))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-bar"},[r("svg",{staticClass:"link",attrs:{width:"150",height:"50"},on:{click:t.goBack}},[r("use",{attrs:{"xlink:href":"./static/assets/sprites.svg#logo"}})]),t._v(" "),r("span",[t.user.uid?t._e():r("button-primary",{class:{"is--loading":t.isLoading},attrs:{label:"Login with Facebook"},on:{action:t.loginUser}}),t._v(" "),t.user.uid?r("strong",{on:{click:t.logOut}},[t._v(t._s(t.user.displayName))]):t._e()],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"button button--primary",attrs:{disabled:t.disabled},on:{click:t.clickHandler}},[t._v(t._s(t.label))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[r("div",{staticClass:"banner banner--main"},[t._v("\n    Help grow ideas\n  ")]),t._v(" "),r("div",{staticClass:"content"},[r("article",[t.user.uid?r("div",{staticClass:"list__header"},[r("h1",[t._v("Projects You Created")]),t._v(" "),t.user.uid?r("button-primary",{attrs:{label:"New Project"},on:{action:function(e){t.goToProject("/projects/new")}}}):t._e()],1):t._e(),t._v(" "),t._l(t.currentUserProjectObj,function(e,n){return r("project-list-item",{key:e,attrs:{item:e},on:{action:function(r){t.goToProject("projects/"+e.url)}}})}),t._v(" "),t.user.uid?r("div",{staticClass:"list__header",staticStyle:{"margin-top":"32px"}},[r("h1",[t._v("Projects You Like")])]):t._e(),t._v(" "),t._l(t.currentUserTargetObj.likes,function(e,n){return r("project-list-item",{key:e,attrs:{item:t.projectObj[n]},on:{action:function(e){t.goToProject("projects/"+t.projectObj[n].url)}}})}),t._v(" "),t._m(0),t._v(" "),t._l(t.listArray,function(e,n){return r("project-list-item",{key:e,attrs:{item:e},on:{action:function(r){t.goToProject("projects/"+e.url)}}})})],2)])])},staticRenderFns:[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"list__header",staticStyle:{"margin-top":"32px"}},[r("h1",[t._v("Recent Projects")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"banner"},[r("div",{staticClass:"banner__content"},[r("h1",[t._v(t._s(t.project.title))]),t._v(" "),r("p",[t._v(t._s(t.project.desc))]),t._v(" "),r("svg",{staticClass:"like-icon",class:{active:t.likes},attrs:{viewBox:"0 0 100 100",width:"40",height:"40"},on:{click:t.toggleLike}},[r("use",{attrs:{"xlink:href":"./static/assets/sprites.svg#heart"}})])])]),t._v(" "),r("div",{staticClass:"content"},[t.project.owner&&t.project.owner.uid===t.user.uid?r("button-primary",{attrs:{label:"Edit Project"},on:{action:t.editProject}}):t._e(),t._v(" "),t.project.owner?r("p",[t._v("Idea by "+t._s(t.project.owner.displayName))]):t._e(),t._v(" "),r("article",{staticClass:"story"},[t.writeup?r("div",{domProps:{innerHTML:t._s(t.writeup.content)}}):t._e(),t._v(" "),r("div",{staticClass:"fb-comments",attrs:{"data-numposts":"5"}})])],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"edit"}},[r("button-primary",{attrs:{label:"submit"},on:{action:t.handleSubmit}}),t._v(" "),r("div",[r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.project.title,expression:"project.title"}],staticClass:"input--title",attrs:{placeholder:"Name Your Idea...",type:"text"},domProps:{value:t.project.title},on:{input:function(e){e.target.composing||(t.project.title=e.target.value)}}}),t._v(" "),r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.project.desc,expression:"project.desc"}],staticClass:"input__long-text",attrs:{placeholder:"Briefly describe your idea!",type:"text"},domProps:{value:t.project.desc},on:{input:function(e){e.target.composing||(t.project.desc=e.target.value)}}}),t._v(" "),r("div",{attrs:{id:"editor"}})])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("div",{attrs:{id:"fb-root"}}),t._v(" "),r("app-bar",{attrs:{user:t.user}}),t._v(" "),r("transition",{attrs:{name:"slide-fade"}},[r("router-view",{attrs:{user:t.user}})],1)],1)},staticRenderFns:[]}}]),[46]);
//# sourceMappingURL=app.c6bca3040706cacd881e.js.map