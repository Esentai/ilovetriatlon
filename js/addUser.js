var app = new Vue({
  el: '#add',
  data: {
    info: null,

    counter: 0,
    newUser: {
      name: [],
      competition: {
        name: '',
        data_swim: '',
        data_run: '',
        data_ride: ''
      },
      distance: '',
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
    this.getAllTeam();
  },

  methods: {
    addInput() {
      this.newUser.name.push({
        value: ''
      });
    },
    getAllTeam: function() {
      axios.get('./api.php?action=read').then(
        response => {
          this.info = response.data;
          console.log(response.data);
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
      for (var i = 0; i < this.newUser.name.length; i++) {
        if (this.newUser.name[i].value.length > 1) {
          names.push(this.newUser.name[i].value);
        }
      }
      var newUser = {
        name: names,
        competition: this.newUser.competition.name,
        data: '',
        date: this.newUser.competition.date,
        stage: this.newUser.stage,
        goal: this.newUser.goal,
        achievement: this.newUser.achievement,
        comments: this.newUser.comments,
        phoneNumber: this.newUser.phoneNumber,
        email: this.newUser.email,
        vk: this.newUser.vk,
        facebook: this.newUser.facebook
      };
      if (this.newUser.distance.length > 0) {
        newUser.data = this.newUser.distance;
      } else {
        if (this.newUser.stage == 'ride') {
          console.log('ride');
          newUser.data = this.newUser.competition.data_ride;
        } else if (this.newUser.stage == 'swim') {
          console.log('Swim');
          newUser.data = this.newUser.competition.data_swim;
        } else {
          newUser.data = this.newUser.competition.data_run;
        }
      }
      console.log(newUser);
      if (
        this.newUser.phoneNumber ||
        this.newUser.email ||
        this.newUser.vk ||
        this.newUser.facebook
      ) {
        if (
          this.newUser.name &&
          this.newUser.competition.name &&
          this.newUser.stage &&
          this.newUser.goal &&
          this.newUser.achievement &&
          this.newUser.comments
        ) {
          var formData = this.toFromData(newUser);
          axios
            .post('./api.php?action=createUser', formData)
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
