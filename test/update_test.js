const assert = require('assert');
const Student = require('../src/student');

describe('update records',(done)=>{
  let jason;
  let jason2;

  beforeEach((done)=>{
    jason = new Student({name: 'Jason', studentNumber: 2500, articleCount: 5, grade: 10});
    jason2 = new Student({name:'Vedant', studentNumber: 3500});
    jason2.save();
    jason.save()
    .then(()=>{done()})
  })

  // it('set and save',(done)=>{
  //   jason.set('name','Vedant')
  //   jason.save()
  //   .then(()=>
  //     Student.find({})
  //   ).then((students)=>{
  //     assert(students[0].name === 'Vedant');
  //     done();
  //   })
  // })

  // it('Update one Jason', async() => {
  //   const student = await Student.updateOne({name: 'Jason'}, {studentNumber: 3000});
  //   const res = await Student.find({});
  //   assert(res[0].studentNumber === 3000)
  //
  // })

  xit('Update Grades',async() => {
    const artCount = await Student.findOne({name: 'Jason'});
    const student = await Student.updateOne({name: 'Jason'}, {$mul: {grade: artCount.articleCount}});
    const res = await Student.find({name: 'Jason'});
    assert(res[0].grade === 50);
  })


})
