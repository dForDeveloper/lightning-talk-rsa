<!-- slide 2 -->
Ron Rivest, Adi Shamir, and Leonard Adleman created the RSA algorithm in 1977
They received the Turing Award (in 2002) which is regarded as the nobel prize of computer science

<!-- slide 3 -->
RSA is an asymmetric cryptosystem.
What does that mean?
Cryptosystems are ways to encrypt and decrypt data
In other words, they're ways to keep information unreadable to people who shouldn't be able to read it.
Encrypting is like locking things up
And decrypting is like unlocking

<!-- slide 4 -->
In symmetric cryptography, there is a single, shared key used for both encrypting and decrypting.
So when you start communications with someone, and you're using symmetric cryptography, you have to be very careful how you transfer the key.
If a third party gets a hold of that key, all of your communication is compromised.

<!-- slide 5 -->
Alice and Bob might feel safe communicating since they are encrypting and decrypting every time they message back and forth, but if Eve got a hold of their shared key, then Eve can read every message she intercepts that either of them sends.

<!-- slide 6 -->
The solution to this problem is to use asymmetric cryptography. 
With asymmetric, there are two keys:
A public key for encrypting which can be given to anyone and everyone
And a private key for decrypting that is never shared

<!-- slide 7 -->
With separate keys for encryption and decryption, the key for decrypting never has to be transferred for a sender to send a message, so there’s no way for it to be intercepted.
When you start communications with someone, and you're using asymmetric cryptography, you can just give them your public key. Then they lock up all their messages with it and send those locked messages to you.
Even if someone got a hold of a message, they wouldn't be able to read it because they don't have the private key.

<!-- slide 8 -->
There are a few different asymmetric encryption algorithms, but I’m going to teach you about RSA. After all, the guys that invented it won a Turing award, and we’re at Turing.
The RSA algorithm works by using big prime numbers.

<!-- slide 9 -->
Start by choosing two different prime numbers, p and q
Let n be the product of p and q
Find phi of n, which is p-1 times q-1
Choose a number e, between 1 and phi of n, that does not share any factors with phi of n other than 1
Calculate the d, the inverse of e modulo phi of n
And that's it. You're done.

<!-- slide 11 -->
You might think,
“n is public knowledge. The only thing keeping a third party from decrypting the cipher text is the number d. How can that be secure?”
Well, it's secure because the only reliable way to figure out what d is is to brute force the factorization of n, and if you start with big enough prime numbers, brute force factoring n is virtually impossible.

<!-- slide 12 -->
Asymmetric encryption is much more computationally expensive than symmetric encryption, so most cryptographic protocols are hybrids. They use asymmetric encryption to send symmetric keys, so that the symmetric keys aren’t intercepted in transit. After the symmetric keys have been safely shared, they use symmetric keys from then on.