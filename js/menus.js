var menus = [];
var myInfo = {
    college: {},
    contacts: {}
};

var mainContent = {
    props: ["menu", "index"],
    template: `
       
        <div v-bind:class="{'main-content': 1, 'card': 1, 'active': active}" 
            v-bind:id="'menu_' + index "
            v-if="!$root.full || $root.full && ( active )">
        
            <h2>{{ menu.title }}</h2>
            <button class="list-button" v-if="active" @click="foldTab()">목록보기</button>
            <div class="heading">
                <h4 class="people">{{ menu.info.people }}인분</h4>
                <span class="divider"></span>
                <h4 class="time">{{ menu.info.time }}분 이내</h4>
                <span class="divider"></span>
                <h4 v-bind:class="{'difficulty': 1, 'low': (0 == menu.info.difficulty), 'middle': (1 == menu.info.difficulty), 'high': (2 == menu.info.difficulty)}">난이도 {{ convertDifficultyToString(menu.info.difficulty) }}</h4>
            </div>
                            
            <p v-html="menu.introduce"></p>
            <div class="content">
                <div class="fakeimg" v-bind:style="{ background: 'url(' + menu.img + ') center center no-repeat', backgroundSize: 'cover' }"></div>

                <transition-group name="active" tag="div"
                    v-on:enter="_onFolded"
                    v-on:leave="_onFolded">

                    <div class="grocery" :key="'grocery'" v-if="active">
                        <h2 class="grocery-header">[재료]</h2>
                        <div class="grocery-content">
                            <ul class="main" v-for="grocery in menu.grocery">
                                <li v-bind:class="{ 'title': index == 0 }" v-for="(item, index) in grocery">{{ item }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="steps" v-if="active" :key="'steps'">
                        <p v-html="menu.tip"></p>
                        <ul>
                            <li v-for="(step, index) in menu.steps">
                                <span class="step-number bg-theme">
                                    {{ index + 1 }}
                                </span>
                                <p class="step-text" v-html="step.text">

                                </p>
                                <img v-bind:src="step.img">
                            </li>

                        </ul>

                    </div>
                </transition-group>
            </div>

            <a @click="readFull()" class="more" v-if="!$root.full">
                <div>
                    ... 본문 보기
                </div>
            </a>
            <a @click="foldTab()" class="more" v-else="$root.full">
                <div>
                    접기
                </div>
            </a>
            
        </div>
    `,
    methods: {
        convertDifficultyToString,
        readFull: function() {
            this.active = true;
            this.$root.full = true;
        }, 
        foldTab: function() {
            this.active = false;
            this.$root.full = false;
        },
        _onFolded: function() {
            var _target = '#menu_' + this.index +'';
            location.href = _target;
            
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
        fries: [],
        soups: [],
        myInfo,
        full: false,
        leftfull: false
    }, methods: {
        _rightAfterLeave: function() {
            this.leftfull = true;
        },
        _rightBeforeEnter: function() {
            this.leftfull = false;
        }
    }
})

getJsonData();

window.onscroll = function() {
    var rightColumn = document.querySelector('.rightcolumn')

    var lastMenu = document.querySelector('.main-content:last-child');
    var top = lastMenu.offsetTop;
    if(rightColumn == undefined) return; 
    if(window.scrollY >= 399 && window.scrollY <= top) {
        rightColumn.style.top = ( window.scrollY - 399 ) + 'px';
    } else if(window.scrollY > top) {
        rightColumn.style.top = top - 399 + 'px';
    } else {
        rightColumn.style.top = 0 + 'px';
    }
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

function getJsonData() {
    var request = new XMLHttpRequest(0);
    request.addEventListener('load', function(data) {
        console.log("load", data);
    })

    request.addEventListener('readystatechange', function(xhr) {
        if(xhr.currentTarget.readyState == 4) {
            var json = JSON.parse(xhr.target.response);
            console.log(json)
            app.menus = json.data;
            app.fries = app.menus.filter(val => val.category == 'F');
            app.soups = app.menus.filter(val => val.category == 'S');

            app.college = json.myInfo.college;
            app.myInfo = json.myInfo;

            console.log(app.menus, app.myInfo)
        }
    })
    request.open("GET", "/menus.json");
    request.send();
}