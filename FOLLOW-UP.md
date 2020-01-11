1. How long did you spend on the coding test? What would you add to your solution if you had more time? **If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.**

> About 4h. I had created some more parameterized routes, mostly with pagination and product search filters, and I have created a service layer between a route response and DAO so that I could reuse some code.

2. What was the most useful feature added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

> In the DAO class the conversion of rows into entities:
```
const productConverter = row => ({
    id: row.product_id,
    name: row.product_name,
    brand: row.product_brand,
    category: row.product_category,
    stock: row.product_stock,
    flagStock: row.product_stock > 0,
    store_id: row.store_id
});
```

3. How would you track down a performance issue in production? Have you ever had to do this?

> Yes, I had. I call "C.S.I. Jobs" and the steps are:
* 1 - Gather as much information as you can about the error (when it happened, how it happened, what error message appearead, if there is a log ...), in some cases it will be necessary to add logs or events to the code to gather more information.
* 2 - Replicate the error, there is no way to fix something that you do not know or do not understand how has happened.
* 3 - Identify where the error is coming from.
* 4 - Now it is possible to correct the error, but if there is no solution yet search the web and make a hypothesis and test this, simulating the error.
* 5 - If the hypothesis fails, there are two ways to follow: either go back to step 1 and gather more information about the error, or isolate the component where the error is coming from, then go back to step 3.

4. How would you monitor and trace issues in a distributed systems environment?

> Developing a monitoring center that would verify the stability of all environments.