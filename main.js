var menus = [];

var mainContent = {
    props: ["menu"],
    template: `
    <div class="main-content card">
        <h2>제육볶음</h2>
        <div class="heading">
            <h4 class="people">{{ menu.info.people }}인분</h4>
            <span class="divider"></span>
            <h4 class="time">{{ menu.info.time }}분 이내</h4>
            <span class="divider"></span>
            <h4 class="difficulty low">난이도 {{ convertDifficultyToString(menu.info.difficulty) }}</h4>
        </div>
        <div class="content">
            <div class="fakeimg" v-bind:style="{ background: 'url('+lastImg+') center center no-repeat', backgroundSize: 'cover' }"></div>
            <div class="grocery">
                <h2 class="grocery-header">[재료]</h2>
                <div class="grocery-content">
                    <ul class="main" v-for="grocery in menu.grocery">
                        <li v-bind:class="{ 'title': index == 0 }" v-for="(item, index) in grocery">{{ item }}</li>
                    </ul>
                </div>
            </div>
            
        <p>{{menu.introduce}}</p>
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
        console.log(this.menu.imgs[this.menu.imgs.length-1]);
        return {
            lastImg: this.menu.imgs[this.menu.imgs.length - 1]
        }
    }
    
}

var app = new Vue({
    el: '#app',
    components: {
        'main-content': mainContent
    },
    data: {
        menus
    }, methods: {
        
    }
})

createMenus();
function createMenus() {
    menus.push({
        title: '제육볶음',
        info: {
            people: 4,
            time: 30,
            difficulty: 0
        },
        grocery: [
            ['메인 식재료', '돼지고기 600g', '양파 1개', '청양고추 2개', '대파 1뿌리']
            , ['양념장', '설탕 2스푼', '고추장 2스푼', '간장 2스푼', '고춧가루 2스푼', '다진마늘', '올리고당']
        ],
        imgs: [
            'https://recipe1.ezmember.co.kr/cache/recipe/2016/01/03/d1282ff159a0d3771a001a8180ab49061.jpg'
            , 'https://recipe1.ezmember.co.kr/cache/recipe/2016/01/03/950f22fb6ba694feeaca97ff9a75eacc1.jpg'
            , 'https://recipe1.ezmember.co.kr/cache/recipe/2016/01/03/11179f6400e55626f1f2f16e58cca3df1.jpg'
            , 'https://recipe1.ezmember.co.kr/cache/recipe/2016/01/03/12d3c8c6adff6d47d0ce2c1f30efa3061.jpg'
            , 'https://recipe1.ezmember.co.kr/cache/recipe/2016/01/03/42ff9061bbde50633506677b2d8dc77f1.jpg'
            , 'https://recipe1.ezmember.co.kr/cache/recipe/2016/01/03/238971bcaa092eee19a2845e3074b2481.jpg'      
        ],
        introduce: '백종원의 제육볶음 레시피로 간단하게 밥반찬 또는 야식, 술안주 뚝딱 만들어봤습니다^^'
    });
    menus.push({
        title: '제육볶음',
        info: {
            people: 4,
            time: 30,
            difficulty: 0
        },
        grocery: [
            ['메인 식재료', '돼지고기 600g', '양파 1개', '청양고추 2개', '대파 1뿌리']
            , ['양념장', '설탕 2스푼', '고추장 2스푼', '간장 2스푼', '고춧가루 2스푼', '다진마늘', '올리고당']
        ],
        imgs: [
            'https://recipe1.ezmember.co.kr/cache/recipe/2016/01/03/d1282ff159a0d3771a001a8180ab49061.jpg'
            , 'https://recipe1.ezmember.co.kr/cache/recipe/2016/01/03/950f22fb6ba694feeaca97ff9a75eacc1.jpg'
            , 'https://recipe1.ezmember.co.kr/cache/recipe/2016/01/03/11179f6400e55626f1f2f16e58cca3df1.jpg'
            , 'https://recipe1.ezmember.co.kr/cache/recipe/2016/01/03/12d3c8c6adff6d47d0ce2c1f30efa3061.jpg'
            , 'https://recipe1.ezmember.co.kr/cache/recipe/2016/01/03/42ff9061bbde50633506677b2d8dc77f1.jpg'
            , 'https://recipe1.ezmember.co.kr/cache/recipe/2016/01/03/238971bcaa092eee19a2845e3074b2481.jpg'      
        ],
        introduce: '백종원의 제육볶음 레시피로 간단하게 밥반찬 또는 야식, 술안주 뚝딱 만들어봤습니다^^'
    });
    
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