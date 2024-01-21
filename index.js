const data = require('./user_data.json');
const relation_data = require('./related_users.json');
const pref = require('./user_preference.json');
const movies = require('./movie_data.json');
const prompt = require("prompt-sync")();

user_data = Object.entries(data)

data.forEach(element => {
    console.log(element);
});
let user = prompt('Enter your user id ');
data.forEach(element => {
    if(element.user_id == user){
        // console.log(element.name);
        // console.log(pref[user]);
        let rel_user = relation_data[user];
        var comedy = 0;
                var doc = 0;
                var horror = 0;
                var mystery = 0;
                var thrill = 0;
                var action = 0;
                var crime = 0;
                var drama = 0;
                var fantasy = 0;
        rel_user.forEach(e => {
            // console.log(pref[e.user_id].preference);
            let preff = pref[e.user_id].preference;
                
            preff.forEach(e1=> {
                switch(e1.genre) {
                    case 'Comedy': comedy+=e1.preference_score;
                    break;
                    case 'Documentary': doc+=e1.preference_score;
                    break;
                    case 'Horror': horror+=e1.preference_score;
                    break;
                    case 'Mystery': mystery+=e1.preference_score;
                    break;
                    case 'Thriller': thrill+=e1.preference_score;
                    break;
                    case 'Action': action+=e1.preference_score;
                    break;
                    case 'Crime': crime+=e1.preference_score;
                    break;
                    case 'Drama': drama+=e1.preference_score;
                    break;
                    case 'Fantasy': fantasy+=e1.preference_score;
                    break;

                } 
            })

        })
        // console.log('comedy',comedy,'doc',doc,'horror',horror,'mystery',mystery,'thrill',thrill,'action',action,'crime',crime,'drama',drama,'fantasy',fantasy);
        var movie_data = {
            'Comedy': comedy,
            'Documentary': doc,
            'Horror': horror,
            'Mystery': mystery,
            'Thriller': thrill,
            'Action': action,
            'Crime': crime,
            'Drama': drama,
            'Fantasy': fantasy
        }
        let sortable = [];
        for (var genre1 in movie_data) {
            sortable.push([genre1, movie_data[genre1]]);
        }
        sortable.sort(function(a, b) {
            return b[1] - a[1]; 
        })
        // console.log(sortable[0][0] ,sortable[1][0]);
        var movie_recomm = [''];
        movies.forEach(e=>{
            let count =  0;
            if(count<=10){
                count= count+1;
                if(e.genres == sortable[0][0] || e.genres == sortable[1][0]){
                    movie_recomm.push(e.movie_id,e.release_date,e.movie_name);
                }   
            } 
        })
        const compareDates = (a, b) => {
            const dateA = new Date(a[1]);
            const dateB = new Date(b[1]);
            return dateB - dateA;
          };
          const pairs = [];
          for (let i = 1; i < movie_recomm.length; i += 3) {
            pairs.push([movie_recomm[i], movie_recomm[i + 1],movie_recomm[i+2]]);
          }
          pairs.sort(compareDates);

          const sortedData = [].concat(...pairs);

          
        sortedData.slice(0,30).forEach(e=>{
            console.log(e);
        })
        
    }

});

