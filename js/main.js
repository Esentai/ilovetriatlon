var app = new Vue({
  el: '#app',
  data: {
    type: 'user',
    info: [],

    counter: 0
  },

  mounted: function() {
    this.getAllTeam();
  },

  created: function() {
    this.getAllTeam();
  },

  methods: {
    changeType(type) {
      this.type = type == 'user' ? 'user' : 'team';
    },
    getAllTeam: function() {
      axios.get('./api.php?action=read').then(
        response => {
          this.info = response.data;
          console.log(response.data);
          this.replaceFun();
        },
        error => {
          console.log(error);
          alert('Сервис временно недоступен. Попробуйте позднее.');
        }
      );
    },
    replaceFun: function() {
      console.log('replaceFun Run');
      for (var i = 0; i < this.info.team.length; i++) {
        this.info.team[i].name = this.info.team[i].name.split(',');
        this.info.team[i].stage = this.info.team[i].stage.split(',');
        this.info.team[i].distance = this.info.team[i].distance.split(',');
        this.info.team[i].achievement = this.info.team[i].achievement.split(
          ','
        );
        this.info.team[i].searchName = this.info.team[i].searchName.split(',');
        this.info.team[i].searchDistance = this.info.team[
          i
        ].searchDistance.split(',');
      }
    }
  }
});
