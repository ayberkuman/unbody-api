### File Search and Filtering

- Implemented a filtering feature for the search results to filter by file type.
- Created a `FileTypeFilters` component for selecting file types to filter the search results.
- Used React state to manage selected file types and filter the results accordingly.
- For pdf files, I checked the file extension because pdf files also has document type.

### Message Editing Functionality

- Implemented an `EditableMessage` component to allow users to edit their messages.
- Users can edit their messages by clicking on the message and make changes.
- When users edit their message, I remove the messages after the edited message and generate a new response.

### Bonus Tasks

- For the bonus tasks, I tried to handle errors and provide better error messages to the user.
- For references, I couldn't generate an answer from the LLM because I kept getting the "cannot generate on fields" error. Also in the Unbody dashboard I couldn't use generate on the GraphQl playground and couldn't find a solution or example for this in the docs. But assuming I get references from the Unbody API, I can easily implement the references feature.

## Future Improvements

There are a lot of improvements that can be made to this project in my opinion. Here are some:

1. Users should be hit enter to submit their message.
2. I think search should work wit keystrokes instead of clicking on the search button and if we do it should be debounced.
3. Responsive design for different screen sizes.
4. There are a lot of errors in the console arising from the nextui components textValue props is empty.
5. Finally, I think this project is heavily dependent on the client side state with hiding message bar and files. Everything would be smoother for the user for example: if we used App Router with RSC, we could use the URL Params to control the search and file selections then chats could be on a separate page and the user could navigate between conversations.
