/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/*.html",
  "./node_modules/flowbite/**/*.js"
],
  theme: {
    fontFamily: {
      body: [
        'Avenir',
        'Helvetica Neue',
        'Helvetica',
        'Arial',
        'Hiragino Sans',
        'ヒラギノ角ゴシック',
        'メイリオ',
        'Meiryo',
        'YuGothic',
        'Yu Gothic',
        'ＭＳ Ｐゴシック',
        'MS PGothic',
        'sans-serif'
      ],

      style:[
        'ヒラギノ明朝 ProN','Hiragino Mincho ProN','Yu Mincho Light','YuMincho','Yu Mincho','游明朝体','ＭＳ 明朝', 'MS Mincho','klee', 'sans-serif'
      ], 

      Dosis:['Dosis', 'sans-serif'],

      Dot:['DotGothic16', 'sans-serif'],

      KaiseiOpti:['Kaisei Opti', 'sans-serif']
      
    },

    extend: {
      cursor: {
        // 'goo': 'cursor-[url(../img/1.svg),_pointer]',
        // 'choki': 'cursor-[url(../img/2.svg),_pointer]',
        // 'paa': 'cursor-[url(../img/5.svg),_pointer]',
      },

      animation: {
        "blink": "blink 1s infinite", 


      },

      keyframes: {
        "blink": {
            "0%": {
                opacity: "1"
            },
            "50%": {
                opacity: "0"
            },
            to: {
                opacity: "1"
            }
        },
      }

    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],

  safelist: [
    "cursor-[url(../img/1.svg),_pointer]", 
    "cursor-[url(../img/2.svg),_pointer]",
    "cursor-[url(../img/5.svg),_pointer]",
    "bg-[url('../img/1.svg')]",
    "bg-[url('../img/2.svg')]",
    "bg-[url('../img/5.svg')]",
  ],
}
