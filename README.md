# Tech interview

This code challenge is designed to assess your ability to create and manage API endpoints, build responsive web interfaces, and handle user states using Nextjs. You will be implementing a search feature for products, along with a history of user searches.

## Code challenge

#### API endpoints

- Create an Next API route `/search`. Inside this route fetch the products from this API >> https://dummyjson.com/docs/products.
- Add parameters to this route such as `rating`, `priceMin`, `priceMax`.

#### Search

- In the homepage, build a navbar with search inputs and a button to trigger the search.
- On the button click call the server endpoint to get the products.
- Show the products in a grid, use responsive styling to **make it look nice**.
  Products cards should include `title`, `price`, `image`, `category`, `reviewAverageRating`

example query => `rating > 4.25` and `price < 800`

#### User Search History Management

- Store all the searches a user do.
- Create a page `/history` where users can see all their searches.
- On the top-right, add a button to clear the search history.

## Challenge execution

In this project, I have implemented the following features and made these technical decisions:

**API Route Enhancement**:

- Analyzed the DummyJSON Products API and noticed that it only provided text-based filtering.
- Transformed the API response into a more suitable object type for displaying the product on the page, adding the `reviewAverageRating` field.
- Implemented additional filtering in the `/api/search` route as `ratingMin`, `ratingMax`, `priceMin`, and `priceMax`. Rating filtering is applied to the `reviewAverageRating` field, which is displayed on the product page.

**Search Functionality**:

- Created a main page with a form containing controlled inputs managed by React state.
- Implemented a submit handler that triggers a call to the `/search` endpoint as requested.

**Alternative Approach Consideration**:

An alternative approach would be saving search filters state in the URL and using a server component to fetch data server-side.
This approach was not implemented because the specs explicitly asked for the creation of an API route, and calling a Next.js API route from a server component is heavily discouraged.
This approach offers several advantages:

- Easy Reproducibility: Storing search parameters in the URL makes searches easily shareable and reproducible.
- SEO Benefits: URL-based parameters can improve search engine optimization for product pages.

In a real-case scenario, calling the API from the server would also optimize latency.

**Search History Management**:

- Implemented saving of search parameters to localStorage after each request.
- Included the date of the request with each saved search.

**History Page**:

- Created a search history page that retrieves past searches from localStorage.
- Displayed the search history in a table format.
- Implemented an event listener to load new searches immediately without needing to reload the page.

**Responsive Design**:

- Ensured that the product grid and search history table are responsive and visually appealing across different screen sizes.

**Error Handling**:

- Implemented error handling for API requests and localStorage operations to improve robustness.
