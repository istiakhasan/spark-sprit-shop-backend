// export const findLastStudentId = async () => {
//     const lastStudent = await User.findOne(
//       {
//         role: 'student',
//       },
//       { id: 1, _id: 0 }
//     )
//       .sort({
//         createdAt: -1,
//       })
//       .lean()
//     return lastStudent?.id ? lastStudent.id.substring(4) : null
//   }
//   export const generateStudentId = async (
//     academicSemester: IAcademicSemester | null
//   ): Promise<string> => {
//     const currentId =
//       (await findLastStudentId()) || (0).toString().padStart(5, '0') //00000
//     //increment by 1
//     let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
//     //20 25
//     incrementedId = `${academicSemester?.year.substring(2)}${
//       academicSemester?.code
//     }${incrementedId}`

//     return incrementedId
//   }
const a = 123
const b = a.toString().padStart(4, 0)
console.log(b)

const c = 'adfadfasdf'.substring(4)
console.log(c)
