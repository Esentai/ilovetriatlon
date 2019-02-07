var app = new Vue({
  el: '#addTeam',
  data: {
    info: null,

    counter: 0,
    newUser: {
      name: [],
      search: [],
      teamName: '',
      competition: {
        name: '',
        data_swim: '',
        data_run: '',
        data_ride: ''
      },
      stage: '',
      goal: '',
      achievement: '',
      comments: '',
      phoneNumber: '',
      email: '',
      vk: '',
      facebook: ''
    }
  },

  mounted: function() {
    this.addInput();
    this.add();
    this.getAllTeam();
  },

  methods: {
    add: function() {
      this.counter += 1;
      this.newUser.search.push({
        stage: '',
        distance: ''
      });
    },
    addInput: function() {
      this.counter += 1;
      this.newUser.name.push({
        name: '',
        stage: '',
        distance: '',
        achievement: ''
      });
    },
    getAllTeam: function() {
      axios.get('./api.php?action=read').then(
        response => {
          this.info = response.data;
        },
        error => {
          console.log(error);
          alert('Сервис временно недоступен. Попробуйте позднее.');
        }
      );
    },

    save: function() {
      console.log('OK');
      var names = [];
      var stages = [];
      var distances = [];
      var searchName = [];
      var searchDistance = [];
      var data = [];
      var achievements = [];

      for (var i = 0; i < this.newUser.search.length; i++) {
        console.log(this.newUser.search[i].stage);
        if (
          this.newUser.search[i].stage.length &&
          this.newUser.search[i].distance.length
        ) {
          searchName.push(this.newUser.search[i].stage);
          searchDistance.push(this.newUser.search[i].distance);
        } else {
          alert('Заполните все поля');
        }
      }
      for (var i = 0; i < this.newUser.name.length; i++) {
        names.push(this.newUser.name[i].name);
        stages.push(this.newUser.name[i].stage);
        distances.push(this.newUser.name[i].distance);
        achievements.push(this.newUser.name[i].achievement);
      }
      var newUser = {
        name: names,
        teamName: this.newUser.teamName,
        searchName: searchName,
        searchDistance: searchDistance,
        competition: this.newUser.competition.name,
        distance: distances,
        date: this.newUser.competition.date,
        stage: stages,
        goal: this.newUser.goal,
        achievement: achievements,
        comments: this.newUser.comments,
        phoneNumber: this.newUser.phoneNumber,
        email: this.newUser.email,
        vk: this.newUser.vk,
        facebook: this.newUser.facebook
      };

      console.log('newUser:', newUser);
      if (newUser.phoneNumber && newUser.email) {
        if (
          newUser.competition &&
          newUser.goal &&
          newUser.comments &&
          newUser.teamName
        ) {
          var formData = this.toFromData(newUser);
          axios
            .post('./api.php?action=createTeam', formData)
            .then(function(response) {
              console.log(response.data);
              if (response.data.message == 'User added successfully') {
                window.location.href = '/';
              }
            });
          console.log('send');
        } else {
          alert('Заполните все поля');
        }
      } else {
        alert('Заполните все поля');
      }
    },

    toFromData: function(obj) {
      var form_data = new FormData();
      for (var key in obj) {
        form_data.append(key, obj[key]);
      }
      return form_data;
    }
  }
});
