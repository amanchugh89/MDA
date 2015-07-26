package org.rssb.mda.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;

/**
 * Created by esuchug on 18-07-2015.
 */
@EnableOAuth2Client
public class OauthHandler  {

    @Autowired
    private OAuth2ClientContext oAuth2ClientContext;


    private void configure(){

    }

}
