{
	"query": "{ issueById(id: 1) { id title description place status user { username role } } }"
}


{
	"query": "{ issues { title } }"
}



https://www.graphql-java.com/documentation/v11/execution/

{
	"query": "mutation($issue: IssueInput){ createIssue(issue: $issue) { id, title, description, created_at } }",
    "variables": {
      "issue": {
        "title": "new issue",
        "description": "well well well",
        "place": "PC12",
        "status": "NEW"
      }
    }
}


