
import { faker } from "@faker-js/faker";
export default (count,userIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
user: userIds[i % userIds.length],

        };
        data = [...data, fake];
    }
    return data;
};
