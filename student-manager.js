/* ================================
   Student Manager – v1
   ================================ */

// تحويل الاسم إلى مفتاح ثابت
function generateStudentKey(name){
    return "student_" + name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "_");
}

// تحميل أو إنشاء بيانات الطالب
function loadStudent(name){
    const key = generateStudentKey(name);
    let data = localStorage.getItem(key);

    if(data){
        return JSON.parse(data);
    }

    // طالب جديد
    const studentData = {
        name: name,
        exams: {}
    };

    localStorage.setItem(key, JSON.stringify(studentData));
    return studentData;
}

// حفظ بيانات الطالب
function saveStudent(studentData){
    const key = generateStudentKey(studentData.name);
    localStorage.setItem(key, JSON.stringify(studentData));
}

// حفظ درجة قسم
function saveScore(sectionName, score){
    const studentName = localStorage.getItem("studentName");
    const examPage = localStorage.getItem("selectedExamPage") || "exam1.html";

    if(!studentName) return;

    const student = loadStudent(studentName);

    if(!student.exams[examPage]){
        student.exams[examPage] = {};
    }

    student.exams[examPage][sectionName] = score;

    saveStudent(student);
}

// قراءة درجة
function getScore(sectionName){
    const studentName = localStorage.getItem("studentName");
    const examPage = localStorage.getItem("selectedExamPage") || "exam1.html";

    if(!studentName) return null;

    const student = loadStudent(studentName);

    return student.exams?.[examPage]?.[sectionName] ?? null;
}

// قراءة كل نتائج الامتحان الحالي
function getExamResults(){
    const studentName = localStorage.getItem("studentName");
    const examPage = localStorage.getItem("selectedExamPage") || "exam1.html";

    if(!studentName) return null;

    const student = loadStudent(studentName);
    return student.exams?.[examPage] || {};
}
