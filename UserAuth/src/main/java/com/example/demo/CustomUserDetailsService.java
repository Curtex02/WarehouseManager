package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


@Component
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserCredentialRepository repository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	 UserCredential data	=repository.findByEmail(username).orElseThrow(() ->new UsernameNotFoundException("User not Found"));
	
		return CustomUserDetails.builder()
				.userEmail(data.getEmail())
				.password(data.getPassword())
				.role(data.getRole())
				.build();
	 
	 
		}

}