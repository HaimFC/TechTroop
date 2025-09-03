const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:@localhost/sql_join')


sequelize
    .query("INSERT INTO company VALUES(null, 'Google', 'Tech', 10000)")
    .then(function ([result]) {
        console.log(result)
    }) 



function addStudent(name, isBrilliant){
    sequelize
        .query(`INSERT INTO student VALUES(null, '${name}', '${isBrilliant}')`)
        .then(function([result]){
            console.log(result)
        })
    }

function addTeacher(name, isTenured){
    sequelize
        .query(`INSERT INTO teacher VALUES(null, '${name}', '${isTenured}')`)
        .then(function([result]){
            console.log(result)
        })
    }

async function enrollStudent(s_name, t_name){ 

    let studentData = await sequelize.query(`SELECT s_id FROM student WHERE student.s_name='${s_name}'`)
    let teacherData = await sequelize.query(`SELECT t_id FROM teacher WHERE teacher.t_name='${t_name}'`)
    let studentID = studentData[0][0].s_id
    let teacherID = teacherData[0][0].t_id

    if (!(studentID && teacherID)) { return }

    sequelize.query(`INSERT INTO student_teacher VALUES(${studentID}, ${teacherID})`)
    
}

enrollStudent("Leonidis", "Yoda")