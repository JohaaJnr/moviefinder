$(document).ready(function(){
    $('#searchForm').on('submit', function(e){
       e.preventDefault();
        let movieName = $('#searchMovie').val();
        $.getJSON(
             'https://www.omdbapi.com/?s='+movieName+'&apikey=f2a5ca4a',
             function(data){
              
            let movies = data.Search;
               $.each(movies, function(i){
                    $('#content').append(`
                
                    <div class="col">
                    <div class="card shadow-sm">
                      <img class="bd-placeholder-img card-img-top" width="100%" height="225" src="${movies[i].Poster}" role="img" aria-label="Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>${movies[i].Title}</title><rect width="100%" height="100%" fill="#55595c"></rect><br><h4 style="color:white" align="center">${movies[i].Title}</h4></svg>
                
                      <div class="card-body">
                        <p class="card-text">
                        <hr>
                        Year : ${movies[i].Year}
                        <hr>
                        Type : ${movies[i].Type}
                        <hr>
                        imdbID: ${movies[i].imdbID}
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary"><a onclick="getMovie('${movies[i].imdbID}');">View</a></button>
                           
                          </div>
                          <small class="text-muted">The Open Movie API</small>
                        </div>
                      </div>
                    </div>
                    <br>
                  </div>
                  
                    
                    `);
               });
              
            }
        );
            $('#info').html(`
            
            <div id="content" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            
            
            </div>
            
            `);
       
    });
});


function getMovie(id){
  sessionStorage.setItem('movieid', id);
  window.location = 'single.html';
  return false;
}

function showMovieInfo(){
  let id = sessionStorage.getItem('movieid');
  $.getJSON(
     'https://www.omdbapi.com/?i='+id+'&apikey=f2a5ca4a',

      function(data){
        let movieDetail = data;
       $('#details').append(`
       <div class="card mb-3">
  <h3 class="card-header">ImdbID: ${movieDetail.imdbID}</h3>
  <div class="card-body">
    <h2 class="card-title">${movieDetail.Title}</h2>
    <h6 class="card-subtitle text-muted">
    imdb Rating: ${movieDetail.imdbRating}
    </h6>
  </div>
  
  <img src="${movieDetail.Poster}" class="d-block user-select-none" width="500px" height="400px" aria-label="Placeholder: ${movieDetail.Title}" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" style="font-size:1.125rem;text-anchor:middle">
    <rect width="100%" height="100%" fill="#868e96"></rect>
    <text x="50%" y="50%" fill="#dee2e6" dy=".3em" >Source: The Open Movie Api</text>
  <br>
  
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Genre: ${movieDetail.Genre}</li>
    <li class="list-group-item">Released:  ${movieDetail.Released}</li>
    <li class="list-group-item">Director:  ${movieDetail.Director} </li>
    <li class="list-group-item">Actors:  ${movieDetail.Actors}</li>
    <li class="list-group-item">Plot:  ${movieDetail.Plot}</li>
    <li class="list-group-item">Type:  ${movieDetail.Type}</li>
    <li class="list-group-item">Runtime:  ${movieDetail.Runtime}</li>
    <li class="list-group-item">BOX Office:  ${movieDetail.BoxOffice}</li>
   
  </ul>
  <div class="card-body">
    <a href="#" class="card-link">Production: ${movieDetail.Production}</a>
    <a href="#" class="card-link">Country: ${movieDetail.Country}</a>
  </div>
 
</div>
<div >
<center><button class="btn btn-primary"><a href="index.html"> Back To Home </a></button></center>
</div>
       
       `);
      }
  );
}
