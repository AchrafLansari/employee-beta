import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    },
    query: {
      fetchPolicy: 'no-cache'
    }
  }
});

export const getDepartementCollection = () => [
  { id: '1', title: 'Development' },
  { id: '2', title: 'Marketing' },
  { id: '3', title: 'Accounting' },
  { id: '4', title: 'Human Ressources' },
];

const getDepartementTitle = (departmentId) => getDepartementCollection()[(+departmentId) - 1].title

export const getDepartementId = (title) => {
  return getDepartementCollection()
    .filter((item) => item.title === title)[0].id
}

export async function insertEmployee(data) {
  const departmentTitle = getDepartementTitle(data.departmentId)
  const result = await client
    .mutate({
      mutation: gql`
      mutation createEmployee {
        employeeCreateOne(
          record:{
            fullName:"${data.fullName}"
            email:"${data.email}"
            gender:${data.gender}
            department:${departmentTitle}
            mobile:"${data.mobile}"
            hireDate:"${data.hireDate}"
            isPermanent:${data.isPermanent}
          }
        )
        {
          record{_id email}
          recordId
        }
      }
    `
    })
  return result
}


export async function updateEmployee(data) {
  const departmentTitle = getDepartementTitle(data.departmentId)
  const result = await client
    .mutate({
      mutation: gql`
      mutation updateEmployee{
        employeeUpdateById(
          _id:"${data._id}"
          record:{
            fullName:"${data.fullName}"
            email:"${data.email}"
            gender:${data.gender}
            department:${departmentTitle}
            mobile:"${data.mobile}"
            hireDate:"${data.hireDate}"
            isPermanent:${data.isPermanent}
          }
        ){
          recordId
          record{
            _id
            email
          }
          error{
            message
          }
        }
      }
    `
    })
  return result
}

export async function deleteEmployee(id) {
  const result = await client
    .mutate({
      mutation: gql`
      mutation deleteEmployee{
        employeeRemoveById(_id:"${id}"){
          recordId
          record{fullName email}
        }
      }
    `
    });
  return result
}

export async function getAllEmployees() {

  const result = await client
    .query({
      query: gql`
      query getAll{
        employeeMany{
          _id
          fullName
          email
          mobile
          department
          gender
          isPermanent
          hireDate
        }
      }
    `
    });
  const employees = result.data.employeeMany.slice()
  return employees
}
