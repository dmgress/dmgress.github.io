---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2012-06-14 17:10:25+00:00
meta:
  _edit_last: '6246633'
  _wpas_done_twitter: '1'
  _wpas_skip_facebook: '1'
parent_id: '0'
password: ''
permalink: /2012/06/14/how-to-properly-re-assign-a-signature-to-an-android-apk-file/
published: true
status: publish
tags:
- android
- apk
- jarsigner
- signing
title: How to properly re-assign a signature to an Android apk file
type: post
---


Today I solved a problem involving an Android app that had a new signature assigned inaccurately. When certain activities are started the result would be a guaranteed crash after throwing `'java.io.FileNotFoundException: This file can not be opened as a file descriptor; it is probably compressed'`. After several attempts it turned out the problem was introduced by the product owner, the one responsible for actually signing the app.

He removed a faulty debug certificate from the original APK file - an error on the development team's side - and then applied his own. The method he used was

> Do the following steps to resign it with your keystore:
>
> * Rename the apk file into a zip file, e.g. Name.apk = Name.zip
> * Unpack/ Unzip the zip file
> * Delete the META-INF folder
> * Repack/ Rezip the folder again to a zip file
> * Rename the zip file again to an apk file
> * [Sign the APK this way:]
>
>    `jarsigner -keystore ~/.android/debug.keystore -storepass android -keypass
>
>   android APPNAME.apk androiddebugkey`

as described on the blog post [How to re-sign a Android apk file for testing](https://dnlkntt.wordpress.com/2011/11/29/how-to-resign-a-android-apk-file-for-testing/ "How to re-sign a Android apk file for testing"). This method is quite invasive because it can alter the structure of the archive. The original APK file might have uncompressed entries, raw resources in `/res/raw`, which will compressed after going through the before mentioned steps. Since the post was about applying a certificate for testing purposes, the behaviour of the new APK might be different from the original one. Any conclusions from the tests should be considered unreliable. The rest of this post will show a way to only alter the signatures of the APK.

The best way to re-assign a signature to an APK is indeed to delete that `META-INF` from your APK and using `jarsigner` to sign it again. The key is to not extract the files at all, you just need to remove the entry from the archive. This could be done in lots of ways. I will show the way I consider to be fastest, using the system shell.

Let's assume the use case where you have a '`your-app.apk`' file and you have a keystore called '`debug.keystore`' with the '`myKey`' alias, '`secret`' as the store's password and '`password123`' as the key's password. First, you remove the `META-INF` directory from the archive:

```
zip -d your-app.apk META-INF/\*
```

Then you sign it again:

```
jarsigner -keystore ./debug.keystore your-app.apk myKey
```

This will ask the passwords for your store and key on the console, so there is no security risk from shell history.

**Update: Some additional ways to remove the META-INF entry**

In addition to just using a console zip program, you can use any graphical archiver (for instance Winzip, 7zip, or the Windows Zip functionality) to remove the `META-INF` entry. The steps are as follows:

1. In some cases you have to rename the APK file before your archiving software of choice will open it as a ZIP archive.

   This means adding the `.zip` extension.
2. Open the ZIP archive and delete the `META-INF` entry. Usually pressing delete works.
3. Verify that the entries of binary resources like images and sound are not compressed. Since you are using a GUI, you can easily browse through all the folders in the archive and compare compressed and actual size. Consult the help files of the software of choice, if necessary.
4. Apply the proper signature, as described before
5. In case you had to rename the APK file, add the `.apk` extension again.

**Update: Fixed the code example of jarsigner to contain the correct alias name.**

