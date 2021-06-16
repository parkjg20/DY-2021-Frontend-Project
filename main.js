var menus = [];
var myInfo = {};

var mainContent = {
    props: ["menu"],
    template: `
    <div class="main-content card">
        <h2>{{menu.title}}</h2>
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
        <a href="#" class="more">
            <div>
                ... 본문 보기
            </div>
        </a>
    </div>
    `,
    methods: {
        convertDifficultyToString
    }, data: function() {
        return {}
    }
    
}

var app = new Vue({
    el: '#app',
    components: {
        'main-content': mainContent
    },
    data: {
        fileIn: false,
        menus,
        myInfo
    }, methods: {
        
    }
})

initDatas();

function initDatas() {
    
    readTextFile("file://\/menus.json")
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    console.log(rawFile);
    rawFile.send(null);
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