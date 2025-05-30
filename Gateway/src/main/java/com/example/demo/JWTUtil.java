
package com.example.demo;

import java.security.Key;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtil {
	private String secret_key = "gQ7opnLAA3KvHX7JvkCniaBlkbAU1Qfvzdacp+sfXEFo3n6/pFBNxHFvqyr6BpWm";
	
	public void validateToken(String jwtToken)
	{
		Jwts.parser()
		.setSigningKey(getSignKey())
		.build()
		.parseClaimsJws(jwtToken);
	}
	
	private Key getSignKey() {
		byte[] keys = Decoders.BASE64.decode(secret_key);
		return Keys.hmacShaKeyFor(keys);
	}

}
