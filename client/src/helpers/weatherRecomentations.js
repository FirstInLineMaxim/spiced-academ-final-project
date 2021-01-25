function uviRecomendation(uvi) {
    let uviRecomendation;
    if (uvi < 3) {
        uviRecomendation = "You can safely enjoy being outside!";
    } else if (uvi < 8) {
        uviRecomendation = "Seek shade during midday hours! Slip on a shirt, slop on sunscreen on your skin and slap on hat! Don't forget to drink water.";
    } else {
        uviRecomendation = "Avoid being outside during midday hours! Make sure you seek shade! Shirt, sunscreen and hat are a must! Don't forget to drink water.";
    }
    return uviRecomendation;
}

function tempRecomendation(temp) {
    let tempRecomendation;
    if (temp < 18) {
        tempRecomendation = [
            {
                title: "Try a new protective hairstyle",
                text: "Protective styles are low maintenance and long lasting, if cared for properly. Some sugestions are: Passion Twists, Senegalese Twists, or just a simple twist. Whichever protective style you choose, it’s important to take care of your scalp and keep it hydrated.",
                img: ''
            },
            {
                title: "Protect your hair with accessories",
                text: "If you want to be warm and keep the healthy of your hair? Give a try to satin-lining beanies, it will prevent curls from being smush and matted, retain moisture, fight frizz, and help preserve your hairstyle.",
                img: ''
            }
        ];
    } else if (temp < 25) {
        tempRecomendation = [
            {
                title: "Ditch Heat",
                text:
                    "Going heatless and using a microfibre towel will absorb the excess water quickly.",
                img: "",
            },
            {
                title: "Ditch Heat",
                text:
                    "OK, this one is a bit of a cheat because trimming only removes dead hair and it won't make your hair grow but it will make your hair instantly look and feel healthier. So make sure your trim or dust your hair to get rid of any split ends.",
                img: "",
            },
            {
                title: "Moisturise Your Hair Effectively",
                text:
                    "Moisturising your afro hair is vital because it helps prevent breakage because dry hair is prone to breakage.",
                img: "",
            },
        ];    
    } else {
        tempRecomendation = [
            {
                title: "Avoid over exposure to minimise UV damage",
                text:
                    "UV rays damage afro hair, just as they damage our skin. The best way to avoid this is to stay out of direct sunshine. Add a hat or headscarf to a protective style when the sun is at its brightest and you'll keep your hair and skin from sun damage.",
                img: "",
            },
            {
                title: "Slay that sweat",
                text:
                    "In the summer we sweat more and this leads to a build up on our scalps. Using a sulphate free shampoo to cleanse and then following up with your moisturising routine will keep your scalp healthy and your afro hair looking fresh this summer.",
                img: "",
            },
            {
                title: "Remember humidity makes afro hair frizz",
                text:
                    "Opt for headscarfs, hats and wear protective styles where the ends of your hair (the oldest and most fragile parts) are tucked away. Styles like buns and braids are stylish, low maintenance and keep your hair from frizzing up by keeping it away. Like your hair to have volume? Rock a twist out or an undefined fro and embrace the frizz which gives you big hair!",
                img: "",
            },
            {
                title: "Drench the dryness",
                text:
                    "Warm weather can lead to dry afro hair. Using the LOC method of layering moisturising products and oils is a great way to protect against this. After cleansing with a sulphate free shampoo, following up with a Lotion, Oil and Cream (LOC) is the best way to keep your hair looking great this summer.",
                img: "",
            },
        ];    
    }
    return tempRecomendation;
}

//content from: https://afrocenchix.com/blogs/afrohair/how-to-care-for-your-afro-hair-this-summer
//content from: https://www.theblacbox.co/blog/surviving-scandinavian-winter-the-afro-hair-edition


export { uviRecomendation, tempRecomendation };