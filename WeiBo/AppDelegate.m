//
//  AppDelegate.m
//  WeiBo
//
//  Created by 胡伟 on 2017/4/17.
//  Copyright © 2017年 胡伟. All rights reserved.
//

#import "AppDelegate.h"
#import <RCTRootView.h>
#import <RCTBundleURLProvider.h>
#import "WeiboSDK.h"

//com.sina.weibo.SNWeiboSDKDemo
#define kAppKey         @"2966635116"
#define kRedirectURI    @"http://www.baidu.com"

@interface AppDelegate () <WeiboSDKDelegate>
@property (nonatomic, copy) RCTResponseSenderBlock callback;
@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    
    NSURL *jsCodeLocation;
    
    jsCodeLocation = [NSURL URLWithString:@"http://192.168.1.104:8081/index.ios.bundle?platform=ios"];
    //
    //    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil]; t
    
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"WeiBo"
                                                 initialProperties:nil
                                                     launchOptions:launchOptions];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
    
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
    
    [self _weiboConfigure];
    
    return YES;
}

- (void)_weiboConfigure{
    [WeiboSDK enableDebugMode:YES];
    [WeiboSDK registerApp:kAppKey];
}

- (void)applicationWillResignActive:(UIApplication *)application {}
- (void)applicationDidEnterBackground:(UIApplication *)application {}
- (void)applicationWillEnterForeground:(UIApplication *)application {}
- (void)applicationDidBecomeActive:(UIApplication *)application {}
- (void)applicationWillTerminate:(UIApplication *)application {}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
    return [WeiboSDK handleOpenURL:url delegate:self];
}

- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
{
    return [WeiboSDK handleOpenURL:url delegate:self ];
}

#pragma mark - WeiboSDKDelegate

- (void)didReceiveWeiboRequest:(WBBaseRequest *)request{
    NSLog(@"request..");
}

- (void)didReceiveWeiboResponse:(WBBaseResponse *)response{
    
    if ([response isKindOfClass:WBAuthorizeResponse.class]){
        NSString *accessToken = ((WBAuthorizeResponse *)response).accessToken;
        NSNumber *expirationDate = @(((WBAuthorizeResponse *)response).expirationDate.timeIntervalSince1970);
        NSString *refreshToken = ((WBAuthorizeResponse *)response).refreshToken;
        if (accessToken && expirationDate && refreshToken) {
            [[NSNotificationCenter defaultCenter] postNotificationName:@"WEIBOLOGINSUCCESS"
                                                                object:@{@"accessToken":accessToken,
                                                                         @"expirationDate":expirationDate,                           
                                                                         @"refreshToken":refreshToken}];
        }
    }
}


@end
