//
//  ViewController.swift
//  AppSyncSample
//
//  Created by hirauchi.shinichi on 2020/01/15.
//  Copyright © 2020 hirauchi.shinichi. All rights reserved.
//

import UIKit
import AWSAppSync
import KDCircularProgress

class ViewController: UIViewController {
    
    var appSyncClient: AWSAppSyncClient?
    
    @IBOutlet weak var progress: KDCircularProgress!
    @IBOutlet weak var label: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        guard let appDelegate = UIApplication.shared.delegate as? AppDelegate else {
            return
        }
        appSyncClient = appDelegate.appSyncClient
        subscribe()

        progress.startAngle = -90
        progress.progressThickness = 0.2
        progress.trackThickness = 0.6
        progress.clockwise = true
        progress.gradientRotateSpeed = 2
        progress.roundedCorners = false
        progress.glowMode = .forward
        progress.glowAmount = 0.9
        progress.set(colors: UIColor.blue ,UIColor.yellow, UIColor.red)
        progress.center = CGPoint(x: view.center.x, y: view.center.y + 25)
        view.addSubview(progress)
        
        setValue(value: 0)
        
    }
    
    func setValue(value:Double) {
        self.progress.angle = value/100 * 360.0
        self.label.text = String(value)
    }
    
    var discard: Cancellable?
    func subscribe() {
        print("subscribe")
        do {
            discard = try appSyncClient?.subscribe(subscription: OnCreateDataSubscription(), resultHandler: { (result, transaction, error) in
                if let result = result {
                    self.setValue(value: result.data?.onCreateData?.value as! Double)
                } else if let error = error {
                    print(error.localizedDescription)
                }
            })
        } catch {
            print("Error starting subscription.")
        }
    }

}

