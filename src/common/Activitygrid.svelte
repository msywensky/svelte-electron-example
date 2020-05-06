<script>
    import { afterUpdate } from 'svelte';

    export let date;
    export let symbol;
    export let data;

    let filtered_data = []

    let sum_quantity = 0;
    let sum_bought = 0;
    let sum_sold = 0;

    function showPos(amt) {
        if (amt >= 0)
            return amt;

        return ' ';
    }

    function showNeg(amt) {
        if (amt <= 0)
            return amt;

        return ' ';
    }

    function calculateValues() {
        filtered_data = data;
        sum_quantity = 0;
        sum_bought = 0;
        sum_sold = 0;

        console.log("Filtering data: " + date + ',' + symbol);
        console.log("length of data: " + data.length);

        if (date > '') {
            filtered_data = filtered_data.filter(item => item.activity_date === date);
        }

        if (symbol > '') {
            filtered_data = filtered_data.filter(item => item.symbol === symbol);
        }

        filtered_data.forEach( item => {
            sum_quantity += item.quantity;
            if (item.amount < 0) {
                sum_bought += item.amount;
            } else if(item.amount > 0) {  // in case it is NaN
                sum_sold += item.amount;
            }
        });
        console.log("Filtered: " + filtered_data);

    }


    afterUpdate(calculateValues)

</script>
<div class="table-container">
    <table class="table is-striped is-narrow">
        <thead>
            <tr>
                <th>Symbol</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Bought$</th>
                <th>Sold$</th>
                <th>&nbsp;</th>
                
            </tr>
        </thead>
        <tbody>
        </tbody>
        {#each filtered_data as item}
        <tr>
            <td>{item.symbol}</td>
            <td>{item.activity_date}</td>
            <td>{item.quantity}</td>
            <td>{showNeg(item.amount)}</td>
            <td>{showPos(item.amount)}</td>
            <td>&nbsp;</td>
        </tr>
        {/each}
        <tfoot>
            <tr>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>{sum_quantity}</th>
                <th>{Math.round(sum_bought)}</th>
                <th>{Math.round(sum_sold)}</th>
                <th>{Math.round(sum_bought + sum_sold)}</th>
            </tr>
        </tfoot>
    </table>
</div>