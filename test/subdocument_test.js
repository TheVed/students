const assert = require('assert');
const Student = require('../src/student');

describe('subdocument test',(done)=>{

  // it('Create a subdocument',(done)=>{
  //   const jason = new Student({
  //     name: 'Jason',
  //     articles: [{title: 'JavaScript'}]
  //   });
  //   jason.save()
  //   .then(()=>{
  //     Student.findOne({name: 'Jason'})
  //     .then((student)=>{
  //       assert(student.articles[0].title === 'JavaScript')
  //       done()
  //     })
  //   })
  // })

  // it('Adding new record',done => {
  //   const jason = new Student({name: 'Jason', articles: []})
  //   jason.save()
  //   .then(() => Student.findOne({name: 'Jason'}))
  //   .then(student => {
  //     assert(student.articles.push({title: 'Mongo'}))
  //     return student.save()
  //   })
  //   .then(() => Student.findOne({name: 'Jason'}))
  //   .then(student => {
  //     assert(student.articles[0].title === 'Mongo')
  //     done()
  //   })
  // })


  it('Remove the records',(done)=>{
    const jason = new Student({name: 'Jason', articles: [{title: 'React Native'}]})
    jason.save()
    .then(()=>Student.findOne({name: 'Jason'}))
    .then((student)=>{
      student.articles[0].remove()
      return student.save()
    })
    .then(()=>Student.findOne({name: 'Jason'}))
    .then((student)=>{
      assert(student.articles.length ===0)
      done()
    })
  })

})
