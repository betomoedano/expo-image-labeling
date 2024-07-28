import ExpoModulesCore
import MLKitVision
import MLKitImageLabeling

let confidence: NSNumber = 0.7

struct ImageLabel: Codable {
  let text: String
  let index: Int
  let confidence: Float
}

public class ExpoImageLabelingModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoImageLabeling")
    
    AsyncFunction("labelImageData") { (imageData: String) -> [String: Any] in
      do {
        guard let data = Data(base64Encoded: imageData),
              let image = UIImage(data: data) else {
          throw NSError(domain: "MLKitError", code: 0, userInfo: [NSLocalizedDescriptionKey: "Failed to decode image data"])
        }
        
        let visionImage = VisionImage(image: image)
        visionImage.orientation = image.imageOrientation
        
        let options = ImageLabelerOptions()
        options.confidenceThreshold = confidence
        
        let labeler = ImageLabeler.imageLabeler(options: options)
        
        let visionLabels = try await labeler.process(visionImage)
        
        let labels = visionLabels.map { visionLabel in
          [
            "text": visionLabel.text,
            "index": visionLabel.index,
            "confidence": visionLabel.confidence
          ]
        }
        
        return ["labels": labels]
      } catch {
        return ["error": error.localizedDescription]
      }
    }
  }
}
