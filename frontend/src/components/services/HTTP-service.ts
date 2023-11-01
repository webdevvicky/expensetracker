
import apiClient from "./api-client";
const controller = new AbortController;

interface Entity {
    _id:string
}

class Httpservice{

    endpoint:string

    constructor(endpoint:string){
       this.endpoint = endpoint

    }


    getall<T>(){
        return apiClient.get<T>(this.endpoint,{
            signal : controller.signal
        })

        
    }

    create<T>(entity :T){
        return apiClient.post(this.endpoint,entity)
    }
   

    delete(userid: string){
        return apiClient.delete(this.endpoint + "/" + userid)
    }

    update<T extends Entity>(entity: T){
        return apiClient.patch(
            this.endpoint + "/" + entity._id,entity
        )
    }

}

const apidata = (endpoint:string)=> new Httpservice(endpoint)

export default apidata;