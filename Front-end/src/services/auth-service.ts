import QueryString from "qs";
import { AccessTokenPayloadDTO, CredentialsDTO, RoleEnum } from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import * as accesTokenRepository from '../localStorage/access-token-repository'
import jwtDecode from "jwt-decode";

export function loginRequest(loginData: CredentialsDTO){

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET)
    }

    const requestBody = QueryString.stringify({...loginData, grant_type: "password"})
    
    const config : AxiosRequestConfig = {
        method: "POST",
        url: "/oauth2/token",
        data: requestBody,
        headers: headers
    }

    return requestBackend(config)
}

export function logout(){
    accesTokenRepository.remove()
}

export function saveAccesToken(token: string){
    accesTokenRepository.save(token)
}

export function getAccessToken() {
    return accesTokenRepository.get()
}

export function getAccessTokenPaylod(): AccessTokenPayloadDTO | undefined {
    try{
        const token = accesTokenRepository.get()
        return token == null 
        ? undefined
        : (jwtDecode(token) as AccessTokenPayloadDTO);
    } catch (error) {
        return undefined
    }
}
export function isAuthenticated(): boolean {
    const tokenPaylod = getAccessTokenPaylod();
    return tokenPaylod && tokenPaylod.exp  * 1000 > Date.now() ? true : false; 
}

export function hasAnyRoles(roles: RoleEnum[]): boolean{
    if(roles.length === 0){
        return true;
    }

    const tokenPaylod = getAccessTokenPaylod();

    if(tokenPaylod !== undefined) {
        return roles.some(role => tokenPaylod.authorities.includes(role))
    }
    return false;
}