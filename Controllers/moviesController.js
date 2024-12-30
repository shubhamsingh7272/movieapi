const fs = require('fs')

let movies = JSON.parse(fs.readFileSync('./data/movies.json'))


exports.checkId=(req,res,next,value)=>{
    const movie = movies.find(el => el.id === value*1)
    if(!movie) {
        return res.status(404).json({
            status: 'fail',
            message: 'Movie not found'
            })
        }
        next()




}

exports.validateBody = (req,res,next)=>{
    if(!req.body.name || !req.body.releaseYear ) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide name and release year'
            })
            }
            next()



    



}

exports.getAllMovie = (req,res)=>{
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestedAt,
        count : movies.length,
        data: {
            movies: movies
            
        }
    })
   
}

exports.getMovie = (req,res)=>{
    const id = +req.params.id
    const movie = movies.find((el) => el.id === id)
   
    
        res.status(200).json({
            status: 'success',
            data: {
                movie: movie
            }
        })
    

}

exports.createMovie = (req,res)=>{
    //console.log(req.body)
    const newId = movies[movies.length-1].id+1
    const newMovie = Object.assign({id: newId},req.body)
    movies.push(newMovie)
    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
        res.status(201).json({
            status: 'success',
            data: {
                movie: newMovie

            }
        })
    })
    
  //  res.send('created')



}


exports.updateMovie = (req,res)=>{
    const id = +req.params.id
    const movieToUpdate = movies.find((el) => el.id === id)
    let index = movies.indexOf(movieToUpdate)
   
                const updatedMovie = Object.assign(movieToUpdate,req.body)
                 movies[index] =movieToUpdate
                fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
                    res.status(200).json({
                        status: 'success',
                        data: {
                            movie: updatedMovie
                            }
                            })
                            })
                            }

            



exports.deleteMovie = (req,res)=>{
    const id = +req.params.id
    const movieToDelete = movies.find((el) => el.id === id)
    let index = movies.indexOf(movieToDelete)
   
                movies.splice(index,1)
                fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
                    res.status(204).json({
                        status: 'success',
                        data: {
                            movie: null
                        }
                        })
                        })
                        }




