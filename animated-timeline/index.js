const data = [
    {
        id: "status-1",
        title: "Order confirmed",
        progress: 100,
        created_at: "Fri, 13th Sep'24",
        trackpoints: [
            {
                id: "trackpoint-1",
                message: "Your order has been placed.",
                created_at: "Fri, 13th Sep'24 8:22pm"
            },
            {
                id: "trackpoint-2",
                message: "Seller has processed your order.",
                created_at: "Sat, 14th Sep'24 12:49pm"
            },
            {
                id: "trackpoint-3",
                message: "Your item has been picked up by courier partner.",
                created_at: "Sat, 14th Sep'24 12:49pm"
            },
        ]
    },
    {
        id: "status-2",
        title: "Shipped",
        progress: 40,
        created_at: "Sat, 14th Sep'24",
        trackpoints: [
            {
                id: "trackpoint-1",
                message: "Your order has been shipped.",
                created_at: "Sat, 14th Sep'24 8:22pm"
            },
            {
                id: "trackpoint-2",
                message: "Your Item has arrived at Kolkata facility.",
                created_at: "Sun, 15th Sep'24 8:22am"
            },
            {
                id: "trackpoint-3",
                message: "Your Item has left a Kolkata facility.",
                created_at: "Sun, 15th Sep'24 4:02pm"
            },
            {
                id: "trackpoint-4",
                message: "Your Item has arrived at Delhi facility.",
                created_at: "Mon, 16th Sep'24 5:02pm"
            },
        ]
    },
    {
        id: "status-3",
        title: "Out for delivry",
        progress: 0,
        created_at: "",
        message: "Item yet to delivered.",
        trackpoints: [
            {
                id: "trackpoint-1",
                message: "Your item is out for delivery.",
                created_at: "Sat, 17th Sep'24 10:22am"
            },
        ]
    },
    {
        id: "status-4",
        title: "Delivery expected by Tue 17th Sep",
        progress: 0,
        created_at: "",
        message: "Item yet to delivered.",
        trackpoints: []
    },
]
document.addEventListener('alpine:init',()=>{
    Alpine.data('timeline',()=>{
        return {
            data
        }
    })
    Alpine.data('trackpoints',(progress,delay)=>{
        return {
            progress:0,
            init(){
                setTimeout(()=>{
                    this.progress = progress;
                },delay)
            }
        }
    })
})