var menus = [];
var myInfo = {};

var mainContent = {
    props: ["menu"],
    template: `
       
        <div v-bind:class="{'main-content': 1, 'card': 1, 'active': active}" v-if="">
        <hr />
            <h2>{{ menu.title }}</h2>
            <div class="heading">
                <h4 class="people">{{ menu.info.people }}인분</h4>
                <span class="divider"></span>
                <h4 class="time">{{ menu.info.time }}분 이내</h4>
                <span class="divider"></span>
                <h4 class="difficulty low">난이도 {{ convertDifficultyToString(menu.info.difficulty) }}</h4>
            </div>
            <div class="content">
                <div class="fakeimg" v-bind:style="{ background: 'url(' + menu.img + ') center center no-repeat', backgroundSize: 'cover' }"></div>
                <div class="grocery">
                    <h2 class="grocery-header">[재료]</h2>
                    <div class="grocery-content">
                        <ul class="main" v-for="grocery in menu.grocery">
                            <li v-bind:class="{ 'title': index == 0 }" v-for="(item, index) in grocery">{{ item }}</li>
                        </ul>
                    </div>
                </div>
                
            <p v-html="menu.introduce"></p>
            </div>
            <a @click="readFull()" class="more">
                <div>
                    ... 본문 보기
                </div>
            </a>
        </div>
    `,
    methods: {
        convertDifficultyToString,
        readFull: function() {
            console.log(this.menu)
            this.active = true;
            this.$root.full = true;
        }
    }, data: function() {
        return {
            active: (this.active == undefined)? false : this.active
        }
    }
    
}

var app = new Vue({
    el: '#app',
    components: {
        'main-content': mainContent
    },
    data: {
        menus: [],
        myInfo,
        full: false
    }, methods: {
        readFull: function() {
            full = true
        }
    }
})

initDatas();

function initDatas() {
    jsonData();
    
}

function convertDifficultyToString(difficulty) {
    switch(difficulty){
        case 0:
            return '하';
        case 1:
            return '중';
        case 2:
            return '상';
    }
}

function jsonData() {
    var request = new XMLHttpRequest(0);
    request.addEventListener('load', function(data) {
        console.log("load", data);
    })

    request.addEventListener('readystatechange', function(xhr) {
        if(xhr.currentTarget.readyState == 4) {
            var json = JSON.parse(xhr.target.response);
            console.log(json)
            app.menus = json.data;
            app.myInfo = json.myInfo;
            console.log(app.menus, app.myInfo)
        }
    })
    request.open("GET", "/menus.json");
    request.send();
}